const mongoose = require("mongoose");

const resultSchema2 = new mongoose.Schema(
  {
    employeeId: {
      type: Number,
      required: true,
      trim: true
    },

    courseName: {
      type: String,
      required: true,
      trim: true
    },

    semBranch: {
      type: String,   
      required: true,
      trim: true
    },

    appearedStudents: {
      type: Number,  
      required: true,
      min: 0
    },

    passedStudents: {
      type: Number,   
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("S2", resultSchema2);