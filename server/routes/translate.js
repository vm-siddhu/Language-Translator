const express = require('express');
const router = express.Router();
const axios = require('axios');
const Translation = require('../models/Translation');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const text = req.body.text;
    const fromLang = req.body.from || 'en';
    const toLang = req.body.to || 'te';

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text required' });
    }

    const apiUrl = 'https://translate.googleapis.com/translate_a/single';
    const apiResponse = await axios.get(apiUrl, {
      params: {
        client: 'gtx',
        sl: fromLang,
        tl: toLang,
        dt: 't',
        q: text
      },
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!apiResponse || !apiResponse.data) {
      return res.status(500).json({ error: 'Translation API error' });
    }

    if (!apiResponse.data[0] || !Array.isArray(apiResponse.data[0])) {
      return res.status(500).json({ error: 'Invalid translation response' });
    }

    const apiData = apiResponse.data[0];
    let finalText = '';
    
    for (let i = 0; i < apiData.length; i++) {
      if (apiData[i] && apiData[i][0]) {
        finalText += apiData[i][0];
      }
    }

    if (!finalText || finalText.trim() === '') {
      return res.status(500).json({ error: 'Translation returned empty' });
    }

    const userId = req.user._id;
    const newTranslation = new Translation({
      sourceText: text,
      translatedText: finalText,
      sourceLanguage: fromLang,
      targetLanguage: toLang,
      userId: userId
    });

    await newTranslation.save();

    res.json({
      success: true,
      originalText: text,
      translatedText: finalText
    });
  } catch (error) {
    console.error('Translation Error:', error.message);
    if (error.response) {
      console.error('API Response Error:', error.response.status, error.response.data);
      return res.status(500).json({ error: 'Translation service error' });
    }
    if (error.request) {
      console.error('Network Error:', 'No response from translation API');
      return res.status(500).json({ error: 'Cannot connect to translation service' });
    }
    res.status(500).json({ error: 'Translation failed: ' + error.message });
  }
});

module.exports = router;

