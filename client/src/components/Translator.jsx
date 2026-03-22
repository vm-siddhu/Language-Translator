import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [text, setText] = useState(''); 
  const [translatedText, setTranslatedText] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 

  const API_URL = process.env.REACT_APP_API_URL || '';
  
  const handleTranslate = async (e) => {
    e.preventDefault(); 

    if (!text.trim()) {
      setError('Please enter text to translate');
      return; 
    }

    setLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login again');
        return;
      }

      const response = await axios.post(`${API_URL}/api/translate`, {
        text: text,
        from: 'en',
        to: 'te'    
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setTranslatedText(response.data.translatedText);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
      } else {
        setError(err.response?.data?.error || 'Translation failed. Please try again.');
      }
      console.error('Translation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setTranslatedText('');
    setError('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
        <form onSubmit={handleTranslate}>
          <div className="mb-8">
            <label htmlFor="english-text" className="block text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              English Text
            </label>
            <textarea
              id="english-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your English text here to translate to Telugu..."
              className="w-full h-48 p-5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 focus:outline-none resize-none text-gray-800 text-lg transition-all shadow-inner"
              disabled={loading}
            />
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Translating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Translate to Telugu</span>
                  </>
                )}
              </button>
              {text && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl shadow-md animate-fade-in">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="telugu-text" className="block text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Telugu Translation
            </label>
            <div className="w-full min-h-48 p-5 border-2 border-purple-200 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 shadow-inner">
              {translatedText ? (
                <p className="telugu-text text-xl leading-relaxed font-medium">{translatedText}</p>
              ) : (
                <p className="text-gray-400 italic text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Translation will appear here...
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Translator;

