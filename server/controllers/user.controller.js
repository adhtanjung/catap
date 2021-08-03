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
		const result = await User.find({}, "-password -createdAt -updatedAt");
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

	// Set cookie
	try {
		const isEmail = validateEmail(usernameOrEmail);
		const fetchedUser = await User.findOne(
			isEmail ? { email: usernameOrEmail } : { username: usernameOrEmail }
		);
		if (!fetchedUser) {
			return handleErr(null, res, 404, "User not found");
		} else {
			const isValid = await argon2.verify(fetchedUser.password, password);
			if (isValid) {
				const token = createJWTToken({ ...fetchedUser._doc });
				const { username, name, email, _id } = fetchedUser;
				let options = {
					maxAge: 1000 * 60 * 15, // would expire after 15 minutes
					httpOnly: true, // The cookie only accessible by the web server
					// signed: true, // Indicates if the cookie should be signed
				};
				res.cookie("userCookie", "cookieValue", options); // options is optional
				// console.log(req.signedCookies, userCookie);
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
	} catch (err) {
		return handleErr(null, res, 500, err.message);
	}
};

exports.me = async (req, res) => {
	console.log(req.user);
	try {
		const { username, name, email } = req.user;
		return res.status(200).send({
			data: { username, name, email },
			message: "Me",
		});
	} catch (err) {
		return handleErr(null, res, 500, err.message);
	}
};
