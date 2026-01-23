const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const {
      username,
      password,
      role,
      name,
      employeeId,
      designation,
      department,
      dateOfJoining,
      qualification,
      scopusId,
      webofScienceId,
      orcidId
    } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      password: hashPassword,
      role,
      name,
      employeeId,
      designation,
      department,
      dateOfJoining,
      qualification,
      scopusId,
      webofScienceId,
      orcidId
    });

    await user.save();

    res.status(201).json({
      message: "User Registered Successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      userId: user._id,
      role: user.role
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userResponse = {
      _id: user._id,
      username: user.username,
      role: user.role,
      name: user.name,
      employeeId: user.employeeId,
      designation: user.designation,
      department: user.department,
      dateOfJoining: user.dateOfJoining,
      qualification: user.qualification,
      scopusId: user.scopusId,
      webofScienceId: user.webofScienceId,
      orcidId: user.orcidId
    };

    res.json({ token, user: userResponse });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server error"
    });
  }
};
