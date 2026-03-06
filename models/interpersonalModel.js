const mongoose = require("mongoose");

const interpersonalSchema = new mongoose.Schema({

 facultyId:String,

 parameter:String,

 score:Number,

 points:Number,

 pdf:String,

 createdAt:{
  type:Date,
  default:Date.now
 }

});

module.exports = mongoose.model(
 "Interpersonal",
 interpersonalSchema
);