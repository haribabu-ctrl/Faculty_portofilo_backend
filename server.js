require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
const teachingRoutes = require("./routes/teaching");

const app = express();

// ================== DB ==================
connectDB();

// ================== Middleware ==================
app.use(cors());
app.use(express.json());

// ================== Health Check ==================
app.get("/", (req, res) => res.send("API Running"));

// ================== Test Users API (Optional) ==================
app.get("/api/users", (req, res) => {
  res.json([
    { name: "Hari", email: "hari@example.com" },
    { name: "Ramu", email: "ramu@example.com" }
  ]);
});

// ================== Routes ==================
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/teaching", teachingRoutes);

// ================== Global Error Handler (Optional but Good) ==================
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

// ================== Server ==================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});