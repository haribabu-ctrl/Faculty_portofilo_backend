const express = require("express");
const userctrl = require("../controllers/userController");
const route = express.Router();
route.get("/roll/:roll",userctrl.getUserDetailsByRoll);
modules.exports = route