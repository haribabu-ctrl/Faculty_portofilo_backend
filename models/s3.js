const mongoose = require("mongoose");

const s3Schema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  s3A: { type: [Number], required: true },
  s3B: { type: [Number], required: true }
});

module.exports = mongoose.model("S3", s3Schema);
