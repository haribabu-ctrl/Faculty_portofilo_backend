const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  facultyId: String,
  teaching: Number,
  research: Number,
  valueAddition: Number,
  administration: Number,
  interpersonal: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);