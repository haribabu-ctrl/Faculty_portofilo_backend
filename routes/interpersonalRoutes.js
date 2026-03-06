const express = require("express");
const router = express.Router();
const multer = require("multer");
const Interpersonal = require("../models/interpersonalModel");

const storage = multer.diskStorage({

 destination:(req,file,cb)=>{
  cb(null,"uploads/");
 },

 filename:(req,file,cb)=>{
  cb(null,Date.now()+"-"+file.originalname);
 }

});

const upload = multer({storage:storage});


router.post("/add", upload.single("pdf"), async(req,res)=>{

 try{

  const newRow = new Interpersonal({

   facultyId:req.body.facultyId,
   parameter:req.body.parameter,
   score:req.body.score,
   points:req.body.points,
   pdf:req.file ? req.file.filename : null

  });

  await newRow.save();

  res.json({
   message:"Saved successfully",
   data:newRow
  });

 }catch(err){
  res.status(500).json(err);
 }

});


// GET DATA
router.get("/:facultyId", async(req,res)=>{

 try{

  const data = await Interpersonal.find({
   facultyId:req.params.facultyId
  });

  res.json(data);

 }catch(err){
  res.status(500).json(err);
 }

});


// DELETE ROW
router.delete("/:id", async(req,res)=>{

 try{

  await Interpersonal.findByIdAndDelete(req.params.id);

  res.json({
   message:"Row Deleted"
  });

 }catch(err){
  res.status(500).json(err);
 }

});

module.exports = router;