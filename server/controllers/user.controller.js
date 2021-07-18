const db = require("../models");
const argon2 = require("argon2");
const User = db.users;

const handleErr = (req, res, stat, err) => {
	return res.status(stat).send({ message: err });
};
exports.findAll = async (req, res) => {
	try {
		const result = await User.find();
		return res.status(200).send(result);
	} catch (err) {
		handleErr(_, res, 500, err.message || "Couldn't retrieve users");
	}
};

exports.create = async (req, res) => {
	const { username, name, password, email } = req.body;
	try {
		const userEmailDupe = await User.findOne({ email });
		const userUsernameDupe = await User.findOne({ username });
		if (userEmailDupe) {
			handleErr(_, res, 400, "Email already taken");
		}
		if (userUsernameDupe) {
			handleErr(_, res, 400, "Username already taken");
		}

		const user = new User({
			username,
			name,
			password: await argon2.hash(password),
			email,
		});
		const result = await user.save(user);
		return res.status(201).send(result);
	} catch (error) {
		handleErr(_, res, 404, err.message || "Unable to create user");
	}
};
