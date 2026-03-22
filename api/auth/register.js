const mongoose = require('mongoose');
const User = require('../../server/models/User');

const dbConnect = async () => {
  if (mongoose.connections[0].readyState === 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/translator');
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const checkEmail = await User.findOne({ email });
    const checkUsername = await User.findOne({ username });

    if (checkEmail || checkUsername) {
      return res.status(400).json({ error: 'User exists' });
    }

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({
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
};
