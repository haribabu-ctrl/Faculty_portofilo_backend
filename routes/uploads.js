const express = require("express");
const multer = require("multer");
const csv = require("csvtojson");
const xlsx = require("xlsx");
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

// ---------- Helpers ----------
const parseNum = (v) => {
  if (v === undefined || v === null || v === "") return 0;
  const n = Number(v);
  return isNaN(n) ? 0 : n;
};

const toStr = (v) => {
  if (v === undefined || v === null) return "";
  return String(v).trim();
};

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
      return res.status(400).json({ error: "File is required" });

    const filePath = req.file.path;
    const originalName = req.file.originalname.toLowerCase();

    let data = [];

    // CSV
    if (originalName.endsWith(".csv")) {
      data = await csv().fromFile(filePath);
    }
    // XLSX
    else if (originalName.endsWith(".xlsx") || originalName.endsWith(".xls")) {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      data = xlsx.utils.sheet_to_json(sheet, { defval: "" });
    } 
    else {
      await fs.unlink(filePath);
      return res.status(400).json({ error: "Only CSV or Excel files allowed" });
    }

    const docs = data
      .filter(r =>
        toStr(getVal(r, "userId")) &&
        toStr(getVal(r, "courseName")) &&
        toStr(getVal(r, "semBranchSec"))
      )
      .map(row => ({
        userId: toStr(getVal(row, "userId")),
        courseName: toStr(getVal(row, "courseName")),
        semBranchSec: toStr(getVal(row, "semBranchSec")),
        appearedA: parseNum(getVal(row, "appearedA")),
        passedB: parseNum(getVal(row, "passedB"))
      }));

    //  INSERT ALL (no overwrite)
    await Model.insertMany(docs);

    await fs.unlink(filePath);

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