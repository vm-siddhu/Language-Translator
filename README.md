# Language Translator - English to Telugu

A full-stack web application for translating English text to Telugu using Node.js, React, and MongoDB, optimized for Vercel Deployment.

## Features

- 🌐 Real-time English to Telugu translation
- 📝 Translation history stored in MongoDB
- 🎨 Modern UI built with React and Tailwind CSS
- 🔄 Serverless API functions ready for Vercel
- 💾 MongoDB for data persistence

## Tech Stack

### Backend
- **Node.js** - Serverless functions
- **Mongoose** - MongoDB object modeling
- **Axios** - HTTP client for Google Translate API
- **Google Translate API** - Translation service (public endpoint)

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB Database (MongoDB Atlas account is recommended for Vercel)
- npm or yarn
- Vercel CLI (optional, for local development)

## Installation & Local Development

1. **Clone or navigate to the project directory**
   ```bash
   cd node-project
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/translator
   ```

4. **Run Locally with Vercel CLI**
   To test the serverless functions alongside the React app, use the Vercel CLI:
   ```bash
   vercel dev
   ```

## Vercel Deployment

1. **Push to GitHub**
2. **Connect to Vercel**: Import the project from your GitHub dashboard on Vercel.
3. **Environment Variables**: Add your `MONGODB_URI` in the Vercel Project Settings.
4. **Deploy**: Vercel will automatically build the React app and deploy the `/api` folder as Serverless functions.

## Project Structure

```
node-project/
├── api/                            # Vercel Serverless Functions
│   ├── auth/
│   │   ├── register.js             # POST /api/auth/register
│   │   └── login.js                # POST /api/auth/login
│   ├── history/
│       └── index.js                # GET, DELETE /api/history
│   └── translate/
│       └── index.js                # POST /api/translate
├── client/                         # React Frontend Built with Tailwind CSS
│   ├── public/
│   ├── src/
│   └── package.json
├── package.json                    
├── vercel.json                     # Vercel Configuration
└── README.md
```

## API Endpoints

### Translate Text
```
POST /api/translate
Body: {
  "text": "Hello, how are you?",
  "from": "en",
  "to": "te"
}
```

### Get Translation History
```
GET /api/history
```

### Delete Translation
```
DELETE /api/history?id=:id
```
