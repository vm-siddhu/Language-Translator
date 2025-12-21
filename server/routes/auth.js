const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const checkEmail = await User.findOne({ email: email });
    const checkUsername = await User.findOne({ username: username });

    if (checkEmail || checkUsername) {
      return res.status(400).json({ error: 'User exists' });
    }

    const newUser = new User({
      username: username,
      email: email,
      password: password
    });

    await newUser.save();

    res.json({
      success: true,
      token: newUser._id,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      success: true,
      token: user._id,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;

