const express = require("express");
const router = express.Router();
const Portfolio = require("../models/portofiloModel");

// Save Portfolio Scores
router.post("/add", async (req, res) => {
  try {
    const portfolio = new Portfolio({
      facultyId: req.body.facultyId,
      teaching: req.body.teaching,
      research: req.body.research,
      valueAddition: req.body.valueAddition,
      administration: req.body.administration,
      interpersonal: req.body.interpersonal,
    });

    await portfolio.save();

    res.status(200).json({
      message: "Portfolio saved successfully",
      data: portfolio
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Portfolio by faculty
router.get("/:facultyId", async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ facultyId: req.params.facultyId });
    res.status(200).json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;