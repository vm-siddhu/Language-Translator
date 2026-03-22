const mongoose = require('mongoose');
const Translation = require('../../server/models/Translation');
const User = require('../../server/models/User');
const { dbConnect, verifyToken } = require('../utils/auth');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const user = await verifyToken(req);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
      const translations = await Translation.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .limit(50);

      return res.status(200).json({
        success: true,
        data: translations
      });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID required' });
      }

      const result = await Translation.findOneAndDelete({
        _id: id,
        userId: user._id
      });

      if (!result) {
        return res.status(404).json({ error: 'Not found' });
      }

      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
};
