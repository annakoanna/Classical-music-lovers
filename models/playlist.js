const mongoose = require("./connection");
const { Schema, model } = mongoose;
const playlistSchema = new Schema({
  name: String,
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "Song"
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
const Playlist = model("Playlist", playlistSchema);


module.exports = Playlist;