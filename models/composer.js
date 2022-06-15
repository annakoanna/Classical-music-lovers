
 const mongoose = require('mongoose');
 const { Schema, model } = mongoose;
 
 const composerSchema = new Schema({
   name: { type: String, required: true }
 });
 const Composer = model("Composer", composerSchema);
 
 module.exports = Composer;