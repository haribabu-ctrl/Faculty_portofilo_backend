require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
const teachingRoutes = require("./routes/teaching");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.get("/api/users", (req, res) => {
  res.json([
    { name: "Hari", email: "hari@example.com" },
    { name: "Ramu", email: "ramu@example.com" }
  ]);
});

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/teaching", teachingRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));