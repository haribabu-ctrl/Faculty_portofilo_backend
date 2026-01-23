const express = require("express");

const S1 = require("../models/s1");
const S2 = require("../models/s2");
const S3 = require("../models/s3");
const S4 = require("../models/s4");

const router = express.Router();
const modelMap = { s1: S1, s2: S2, s3: S3, s4: S4 };

router.get("/:table/:userId", async (req, res) => {
  const Model = modelMap[req.params.table];
  if (!Model) return res.status(400).json({ error: "Invalid table" });

  const data = await Model.find({ userId: req.params.userId });
  res.json(data);
});

module.exports = router;
