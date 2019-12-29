const express = require("express");

const server = express();

const PORT = process.env.PORT || 8000;

const HOST = process.env.HOST || `127.0.0.1`

const loginRoute = require("./Routes/loginRoute");

const registerRoute = require("./Routes/registerRoute");

server.use(express.json());

server.use("/login", loginRoute);

server.use("/register", registerRoute);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: "Something went wrong"});
});

server.listen(PORT, () => {
    console.log(`\n *** Server running on port ${PORT} *** \n`);
});