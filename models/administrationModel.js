const mongoose = require("mongoose");

const administrationSchema = new mongoose.Schema({
  activityTitle: String,
  centralPoints: Number,
  deptPoints: Number,
  pointsClaimed: Number,
  pdf: String
});

module.exports = mongoose.model("Administration", administrationSchema);