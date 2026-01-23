const mongoose = require("mongoose");

const s2Schema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  s2Feedback: { type: [Number], required: true }
});

module.exports = mongoose.model("S2", s2Schema);
