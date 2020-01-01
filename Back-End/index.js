const express = require("express");

const server = express();

const PORT = process.env.PORT || 8000;

const HOST = process.env.HOST || `127.0.0.1`

const userRoute = require("./Routes/userRoute");

const postRoute = require("./Routes/postRoute");

const cors = require("cors");

server.use(express.json());

server.use(cors());

server.use("/users", userRoute);

server.use("/posts", postRoute);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: "Something went wrong"});
});

server.listen(PORT, () => {
    console.log(`\n *** Server running on port ${PORT} *** \n`);
});