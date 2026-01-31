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

// 🔥 Robust CSV header getter (handles spaces, case, BOM)
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
    const tableName = req.params.table.toLowerCase();
    const Model = modelMap[tableName];
    if (!Model) return res.status(400).json({ error: "Invalid table" });

    if (!req.file)
      return res.status(400).json({ error: "CSV/Excel file is required" });

    const data = await csv().fromFile(req.file.path);

    // 🧪 Debug once if needed
    // console.log(Object.keys(data[0]));

    const docs = data
      .filter(r =>
        getVal(r, "Employee ID") &&
        getVal(r, "Course Name") &&
        getVal(r, "Sem-Branch-Sec")
      )
      .map(row => ({
        employeeId: parseNum(getVal(row, "Employee ID")),
        courseName: getVal(row, "Course Name").trim(),
        semBranch: getVal(row, "Sem-Branch-Sec").trim(),
        appearedStudents: parseNum(
          getVal(row, "No. of students appeared (A)")
        ),
        passedStudents: parseNum(
          getVal(row, "No. of students Passed (B)")
        )
      }));

    for (const doc of docs) {
      await Model.updateOne(
        { employeeId: doc.employeeId },
        { $set: doc },
        { upsert: true }
      );
    }

    await fs.unlink(req.file.path);

    res.json({
      message: `${tableName.toUpperCase()} uploaded successfully`,
      inserted: docs.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
