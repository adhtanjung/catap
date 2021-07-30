const { checkToken } = require("../middleware/token");

module.exports = (app) => {
	const users = require("../controllers/user.controller");
	const router = require("express").Router();

	router.get("/", users.findAll);
	router.post("/", users.create);
	router.post("/login", users.login);

	app.use("/api/users", router);
};
