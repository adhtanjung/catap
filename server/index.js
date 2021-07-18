const express = require("express");

const app = express();

const http = require("http").createServer(app);

const io = require("socket.io")(http);

const bearerToken = require("express-bearer-token");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bearerToken());

const db = require("./models");
db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	})
	.then((result) => {
		console.log(`
█▀▄▀█ █▀█ █▄░█ █▀▀ █▀█ █▀▄ █▄▄   █▀▀ █▀█ █▄░█ █▄░█ █▀▀ █▀▀ ▀█▀ █▀▀ █▀▄
█░▀░█ █▄█ █░▀█ █▄█ █▄█ █▄▀ █▄█   █▄▄ █▄█ █░▀█ █░▀█ ██▄ █▄▄ ░█░ ██▄ █▄▀
`);
	})
	.catch((err) => {
		console.log("cannot connect to the database", err);

		process.exit();
	});

io.on("connection", (socket) => {
	socket.on("message", ({ name, message }) => {
		io.emit("message", { name, message });
	});
});

const PORT = 8000;
app.get("/", (req, res) => {
	res.send("<h1> CATAP API </h1>");
});

require("./routes/user.routes")(app);
http.listen(PORT, function () {
	console.log(`
░█████╗░░█████╗░████████╗░█████╗░██████╗░  ░█████╗░██████╗░██╗
██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗  ██╔══██╗██╔══██╗██║
██║░░╚═╝███████║░░░██║░░░███████║██████╔╝  ███████║██████╔╝██║
██║░░██╗██╔══██║░░░██║░░░██╔══██║██╔═══╝░  ██╔══██║██╔═══╝░██║
╚█████╔╝██║░░██║░░░██║░░░██║░░██║██║░░░░░  ██║░░██║██║░░░░░██║
░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░░░░  ╚═╝░░╚═╝╚═╝░░░░░╚═╝


    listening on port http://localhost:${PORT}`);
});
