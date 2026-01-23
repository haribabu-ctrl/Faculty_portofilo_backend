const mongoose = require("mongoose");

const s4Schema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  s4A: { type: [Number], required: true },
  s4B: { type: [Number], required: true }
});

module.exports = mongoose.model("S4", s4Schema);
