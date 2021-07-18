const jwt = require("jsonwebtoken");
require("dotenv").config();
const createJWTToken = (payload) => {
	return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
		expiresIn: "24h",
	});
};

const checkToken = (req, res, next) => {
	if (req.method !== "OPTIONS") {
		jwt.verify(req.token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					message: err.message,
					status: "Unauthorized",
				});
			}

			req.user = decoded;
			next();
		});
	}
};

module.exports = {
	createJWTToken,
	checkToken,
};
