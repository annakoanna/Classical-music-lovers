const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const songSchema = new Schema({
  name: { type: String, required: true },
  audio: {type: String },
  composer: {
    type: Schema.Types.ObjectId,
    ref: "Composer",
    required: true
  }
});
const Song = model("Song", songSchema);

module.exports = Song;
