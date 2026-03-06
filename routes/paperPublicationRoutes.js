const express = require("express");
const multer = require("multer");
const router = express.Router();
const PaperPublication = require("../models/paperPublicationModel");

// Setup storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("pdf"), async (req, res) => {
  try {
    const newPaper = new PaperPublication({
      facultyId: req.body.facultyId,
      articleDetails: req.body.articleDetails,
      category: req.body.category,
      impactFactor: parseFloat(req.body.impactFactor),
      points: parseFloat(req.body.points),
      pdf: req.file ? req.file.filename : null
    });

    await newPaper.save();

    res.json({ message: "Saved successfully", data: newPaper });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:facultyId", async (req, res) => {
  try {
    const papers = await PaperPublication.find({
      facultyId: req.params.facultyId
    });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;