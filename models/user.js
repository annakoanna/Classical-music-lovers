const mongoose = require("./connection");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  playlist: {
    type: Schema.Types.ObjectId,
    ref: "Playlist"
  }
});
const User = model("User", userSchema);


module.exports = User;
