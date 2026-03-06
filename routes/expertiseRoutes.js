const express = require("express");
const router = express.Router();
const multer = require("multer");

const Expertise = require("../models/expertiseModel1");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,"uploads/");
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({storage:storage});

// SAVE DATA
router.post("/add", upload.single("pdf"), async (req,res)=>{
  try{

    const newExpertise = new Expertise({
      fac:req.body.fac,
      event:req.body.event,
      role:req.body.role,
      duration:req.body.duration,
      type:req.body.type,
      points:req.body.points,
      pdf:req.file ? req.file.filename : null
    });

    await newExpertise.save();

    res.json({
      message:"Data saved successfully",
      data:newExpertise
    });

  }catch(err){
    res.status(500).json(err);
  }
});

// GET DATA
router.get("/all", async(req,res)=>{
  try{

    const data = await Expertise.find();
    res.json(data);

  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;