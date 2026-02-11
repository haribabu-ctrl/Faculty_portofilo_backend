const express = require("express");

const S1 = require("../models/s1");
const S2 = require("../models/s2");
const S3 = require("../models/s3");
const S4 = require("../models/s4");

const router = express.Router();

const modelMap = {
  s1: S1,
  s2: S2,
  s3: S3,
  s4: S4
};

router.get("/:table/:userId", async (req, res) => {
  try {
    const table = req.params.table.toLowerCase().trim();
    const userId = req.params.userId.trim();

    const Model = modelMap[table];
    if (!Model) {
      return res.status(400).json({ error: "Invalid table name" });
    }

    const data = await Model
      .find({ userId })
      .sort({ courseName: 1 })   // A-Z order
      .lean();

    return res.json({
      success: true,
      table,
      userId,
      count: data.length,
      data
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;