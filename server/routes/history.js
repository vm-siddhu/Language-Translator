const express = require('express');
const router = express.Router();
const Translation = require('../models/Translation');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const translations = await Translation.find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: translations
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const translationId = req.params.id;
    const userId = req.user._id;
    
    const result = await Translation.findOneAndDelete({ 
      _id: translationId, 
      userId: userId 
    });
    
    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;

