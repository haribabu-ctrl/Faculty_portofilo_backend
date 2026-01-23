const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  employeeId: {
    type: Number,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  semBranchSec: {
    type: String,
    required: true
  },
  appeared: {
    type: Number,
    required: true
  },
  passed: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("S1", schema);