const mongoose = require("mongoose");

const paperPublicationSchema = new mongoose.Schema({
  facultyId: String,
  articleDetails: String,
  category: String,
  impactFactor: Number,
  points: Number,
  pdf: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PaperPublication", paperPublicationSchema);