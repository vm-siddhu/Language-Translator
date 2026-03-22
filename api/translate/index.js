const mongoose = require('mongoose');
const axios = require('axios');
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const user = await verifyToken(req);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { text, from = 'en', to = 'te' } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text required' });
    }

    const apiUrl = 'https://translate.googleapis.com/translate_a/single';
    const apiResponse = await axios.get(apiUrl, {
      params: {
        client: 'gtx',
        sl: from,
        tl: to,
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

    const newTranslation = new Translation({
      sourceText: text,
      translatedText: finalText,
      sourceLanguage: from,
      targetLanguage: to,
      userId: user._id
    });

    await newTranslation.save();

    res.status(200).json({
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
    res.status(500).json({ error: 'Translation failed: ' + error.message });
  }
};
