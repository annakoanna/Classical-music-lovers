// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV V
const mongoose = require("mongoose");

// Setup inputs for our connect function
const MONGODB_URI = process.env.MONGODB_URI;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(MONGODB_URI, CONFIG);// Events for when connection opens/disconnects/errors
// mongoose.connection
//     .on("open", () => console.log("Connected to Mongoose"))
//     .on("close", () => console.log("Disconnected from Mongoose"))
//     .on("error", (error) => console.log(error));




mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`);
  });
  
  mongoose.connection.on("error", (err) => {
    console.log("Could not connect to MongoDB!", err);
  });
    //export the connection
module.exports = mongoose