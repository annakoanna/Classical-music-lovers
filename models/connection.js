require("dotenv").config(); // Load ENV V
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, CONFIG);// log
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`);
});

mongoose.connection.on("error", (err) => {
    console.log("Could not connect to MongoDB!", err);
});

module.exports = mongoose