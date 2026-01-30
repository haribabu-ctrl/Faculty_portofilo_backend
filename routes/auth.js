const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth_middleware');
const User = require('../models/User');

// 👉 REGISTER
router.post('/register', register);

// 👉 LOGIN
router.post('/login', login);

// 👉 GET PROFILE (Protected)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("PROFILE ERROR 👉", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
