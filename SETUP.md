# Quick Setup Guide

## Step 1: Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

Or use the combined command:
```bash
npm run install-all
```

## Step 2: Configure Environment

Create a `.env` file in the root directory with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/translator
```

## Step 3: Start MongoDB using MongoDB Compass

- Open MongoDB Compass application
- Connect to `mongodb://localhost:27017`
- The database will be created automatically when you use the app

## Step 4: Run the Application

```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 3000).

## Step 5: Open Browser

Navigate to: `http://localhost:3000`

## Troubleshooting

- **MongoDB not connecting**: Check if MongoDB is running and MONGODB_URI is correct
- **Port conflicts**: Change PORT in .env file
- **Translation errors**: Ensure you have internet connection

