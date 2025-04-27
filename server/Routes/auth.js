const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/signup');
const Property = require('../models/property');


// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, aadharID, panNumber, email, phoneNumber, password, userType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      username,
      aadharID,
      panNumber,
      email,
      phoneNumber,
      password, // plain text
      userType
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password, userType } = req.body;

    const user = await User.findOne({ username, userType });
    if (!user) return res.status(400).json({ message: 'User not found or incorrect role' });

    if (user.password !== password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({
      message: 'Login successful',
      token: 'dummy-token',
      userType: user.userType,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;