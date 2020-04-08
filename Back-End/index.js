const express = require("express");

const server = express();

const PORT = process.env.PORT || 8000;

const HOST = process.env.HOST || `127.0.0.1`

const userRoute = require("./Routes/userRoute");

const postRoute = require("./Routes/postRoute");

const authRoute = require("./mongoDB/Routes/authRouter");

const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@starter-fyope.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("Error connecting to DB", err));

// mongoose.connection.on("error", err => console.log(err));

const cors = require("cors");

server.use(express.json());

server.use(cors());



server.use("/auth", authRoute);

server.use("/users", userRoute);

server.use("/posts", postRoute);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
});

server.listen(PORT, () => {
    console.log(`\n *** Server running on port ${PORT} *** \n`);
});