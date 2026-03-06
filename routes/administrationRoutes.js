const express = require("express");
const router = express.Router();

const upload = require("../config/administrationUpload");
const adminController = require("../controllers/administrationController");

router.post("/add", upload.single("pdf"), adminController.addAdministration);

module.exports = router;