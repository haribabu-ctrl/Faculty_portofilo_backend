const express = require("express");
const multer = require("multer");
const csv = require("csvtojson");
const fs = require("fs").promises;

const S1 = require("../models/s1");
const S2 = require("../models/s2");
const S3 = require("../models/s3");
const S4 = require("../models/s4");

const router = express.Router();

// Multer setup
const upload = multer({ dest: "uploads/" });

// Map table param to Model
const modelMap = { s1: S1, s2: S2, s3: S3, s4: S4 };

// Safe number parser
const parseNum = (v) => {
  if (v === undefined || v === null || v === "") return 0;
  const n = Number(v);
  return isNaN(n) ? 0 : n;
};

// Robust CSV header getter
const getVal = (row, key) => {
  const foundKey = Object.keys(row).find(
    k =>
      k.replace(/\ufeff/g, "").trim().toLowerCase() ===
      key.trim().toLowerCase()
  );
  return foundKey ? row[foundKey] : "";
};

// ==================== Upload Route ====================
router.post("/:table", upload.single("file"), async (req, res) => {
  try {
    const tableName = req.params.table.toLowerCase().trim();
    const Model = modelMap[tableName];
    if (!Model) return res.status(400).json({ error: "Invalid table" });

    if (!req.file)
      return res.status(400).json({ error: "CSV file is required" });

    const data = await csv().fromFile(req.file.path);

    const docs = data
      .filter(r =>
        getVal(r, "userId") &&
        getVal(r, "courseName") &&
        getVal(r, "semBranchSec")
      )
      .map(row => ({
        userId: getVal(row, "userId").trim(),
        courseName: getVal(row, "courseName").trim(),
        semBranchSec: getVal(row, "semBranchSec").trim(),
        appearedA: parseNum(getVal(row, "appearedA")),
        passedB: parseNum(getVal(row, "passedB"))
      }));

    for (const doc of docs) {
      await Model.updateOne(
        {
          userId: doc.userId,
          courseName: doc.courseName
        },
        { $set: doc },
        { upsert: true }
      );
    }

    await fs.unlink(req.file.path);

    res.json({
      success: true,
      table: tableName,
      inserted: docs.length
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;