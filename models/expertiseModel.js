const mongoose = require("mongoose");

const expertiseSchema = new mongoose.Schema({
  event: String,
  role: String,
  duration: String,
  type: String,
  points: Number,
  pdf: String
});

module.exports = mongoose.model("Expertise", expertiseSchema);