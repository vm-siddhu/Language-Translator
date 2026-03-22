const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../server/models/User');

const dbConnect = async () => {
  if (mongoose.connections[0].readyState === 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/translator');
};

const verifyToken = async (req) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.body?.token || req.query?.token;
    
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this-in-production');
    
    await dbConnect();
    const user = await User.findById(decoded.id);
    
    return user;
  } catch (error) {
    console.error('Auth verification error:', error.message);
    return null;
  }
};

module.exports = { dbConnect, verifyToken };
