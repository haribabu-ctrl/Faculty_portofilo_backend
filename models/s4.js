const mongoose = require("mongoose");

const resultSchema4 = new mongoose.Schema(
  {
    userId: {
      type: String,        // better than Number
      required: true,
      trim: true
    },

    courseName: {
      type: String,
      required: true,
      trim: true
    },

    semBranchSec: {
      type: String,
      required: true,
      trim: true
    },

    appearedA: {
      type: Number,
      required: true,
      min: 0
    },

    passedB: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("S4", resultSchema4);