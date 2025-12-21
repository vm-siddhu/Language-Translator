const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  sourceText: {
    type: String,
    required: true
  },
  translatedText: {
    type: String,
    required: true
  },
  sourceLanguage: {
    type: String,
    default: 'en'
  },
  targetLanguage: {
    type: String,
    default: 'te'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Translation', translationSchema);

