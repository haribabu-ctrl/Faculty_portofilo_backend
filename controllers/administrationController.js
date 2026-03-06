const Administration = require("../models/administrationModel");

exports.addAdministration = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);


    const newAdmin = new Administration({
      activityTitle: req.body.activityTitle,
      centralPoints: req.body.centralPoints,
      deptPoints: req.body.deptPoints,
      pointsClaimed: req.body.pointsClaimed,
      pdf: req.file ? req.file.filename : ""
    });

    await newAdmin.save();

    res.json({
      message: "Administration Data Saved",
      data: newAdmin
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};