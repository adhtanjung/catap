const db = require("../models");
const argon2 = require("argon2");
const { createJWTToken } = require("../middleware/token");
const validateEmail = require("../helpers/validateEmail");
const User = db.users;

const handleErr = (req, res, stat, err) => {
	return res.status(stat).send({ message: err });
};
exports.findAll = async (req, res) => {
	try {
		const result = await User.find();
		return res.status(200).send(result);
	} catch (err) {
		return handleErr(null, res, 500, err.message || "Couldn't retrieve users");
	}
};

exports.create = async (req, res) => {
	const { username, name, password, email } = req.body;
	try {
		const userEmailDupe = await User.findOne({ email });
		const userUsernameDupe = await User.findOne({ username });
		if (userEmailDupe) {
			return handleErr(null, res, 400, "Email already taken");
		}
		if (userUsernameDupe) {
			return handleErr(null, res, 400, "Username already taken");
		}

		const user = new User({
			username,
			name,
			password: await argon2.hash(password),
			email,
		});
		const result = await user.save(user);
		return res.status(201).send(result);
	} catch (err) {
		handleErr(null, res, 404, err.message || "Unable to create user");
	}
};

exports.login = async (req, res) => {
	const { usernameOrEmail, password } = req.body;

	try {
		const isEmail = validateEmail(usernameOrEmail);
		if (isEmail) {
			const fetchUserByEmail = await User.findOne({
				email: { $eq: usernameOrEmail },
			});
			if (!fetchUserByEmail) {
				return handleErr(null, res, 404, "User not found");
			} else {
				const isValid = await argon2.verify(
					fetchUserByEmail.password,
					password
				);
				if (isValid) {
					const token = createJWTToken({ ...fetchUserByEmail._doc });
					const { username, name, email, _id } = fetchUserByEmail;
					return res.status(200).send({
						data: {
							username,
							name,
							email,
							id: _id,
						},
						token,
					});
				} else {
					return handleErr(null, res, 400, "Wrong password");
				}
			}
		} else {
			const fetchUserByUsername = await User.findOne({
				username: { $eq: usernameOrEmail },
			});
			if (!fetchUserByUsername) {
				return handleErr(null, res, 404, "User not found");
			} else {
				const isValid = await argon2.verify(
					fetchUserByUsername.password,
					password
				);
				if (isValid) {
					const token = createJWTToken({ ...fetchUserByUsername._doc });
					const { username, name, email, _id } = fetchUserByUsername;
					return res.status(200).send({
						data: {
							username,
							name,
							email,
							id: _id,
						},
						token,
					});
				} else {
					return handleErr(null, res, 400, "Wrong password");
				}
			}
		}
	} catch (err) {
		return handleErr(null, res, 500, "Something went wrong");
	}
};
