# Language Translator - English to Telugu

A full-stack web application for translating English text to Telugu using Node.js, React, and MongoDB.

## Features

- 🌐 Real-time English to Telugu translation
- 📝 Translation history stored in MongoDB
- 🎨 Modern UI built with React and Tailwind CSS
- 🔄 RESTful API with Express.js
- 💾 MongoDB for data persistence

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Axios** - HTTP client for Google Translate API
- **Google Translate API** - Translation service (public endpoint)

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd node-project
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```
   
   **Important:** Make sure these packages are installed:
   - bcryptjs (for password hashing)
   - jsonwebtoken (for authentication)
   
   If they're missing, install them:
   ```bash
   npm install bcryptjs jsonwebtoken
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

   Or install all at once:
   ```bash
   npm run install-all
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/translator
   JWT_SECRET=your-secret-key-change-this-in-production
   ```

5. **Start MongoDB using MongoDB Compass**
   
   - Open MongoDB Compass application
   - Connect to your local MongoDB instance (default: `mongodb://localhost:27017`)
   - The database `translator` will be created automatically when you first use the app
   - You can view and manage your translation data directly in MongoDB Compass

## Running the Application

### Option 1: Run both servers together (Recommended)
```bash
npm run dev
```

This will start both the backend server (port 5000) and React development server (port 3000) concurrently.

### Option 2: Run servers separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter English text in the input field
3. Click "Translate to Telugu" button
4. View the translated text in Telugu
5. Check the "History" tab to see all previous translations

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
DELETE /api/history/:id
```

## Project Structure

```
node-project/
├── server/
│   ├── index.js                    # Express server setup
│   ├── models/
│   │   └── Translation.js          # MongoDB schema (Mongoose)
│   └── routes/
│       ├── translate.js            # Translation routes (POST)
│       └── history.js              # History routes (GET, DELETE)
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Translator.js
│   │   │   └── History.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── package.json
├── .env
└── README.md
```

## Concepts Used (Based on Syllabus)

### Unit I: Getting Started with Node.JS
✅ **Implemented in main code:**
- Node Package Manager (npm) - package.json and dependencies
- NPM modules (Core Modules, Local Modules, Third Party Modules)
- Promises and async/await - used throughout the codebase
- Callbacks - used in MongoDB connection

✅ **Examples provided in `server/examples/core-modules-examples.js`:**
- Core modules (fs module, path module)
- Working with JSON (JSON.parse, JSON.stringify)
- EventEmitter in Node.js - custom event examples
- Callbacks in Node.js - callback function examples
- Promises and async/await - file reading examples

### Unit II: Implementing HTTP Services & Basic Websites
✅ **Implemented:**
- Express.js framework - main server setup
- Setting up HTTP server - app.listen()
- Understanding Request and Response objects - req, res
- Implementing basic routing - GET, POST, DELETE routes
- Setting response headers and status codes - res.status(), res.json()
- GET and POST methods - implemented in routes
- body-parser - express.json() and express.urlencoded()
- express.Router - organizing routes in separate files

### Unit III: Socket Services & Middlewares
✅ **Implemented:**
- Creating middlewares - CORS, body-parser middleware
- app.use() - applying middleware to all routes
- Basic middleware implementation - custom middleware examples

✅ **Examples provided in `server/examples/middleware-examples.js`:**
- Introduction to middleware - custom middleware functions
- cookie-parser - cookie handling examples
- express-session - session management examples
- app.use() vs app.all() - differences explained

### Unit IV: MongoDB & Mongoose
✅ **Implemented:**
- MongoDB connection using Node.js - mongoose.connect()
- Mongoose Schema definition - Translation schema
- Models - Translation model
- CRUD operations:
  - **Create** - translation.save() in translate route
  - **Read** - Translation.find() in history route
  - **Delete** - Translation.findByIdAndDelete() in history route

### Unit V: React Concepts

#### ReactJS Installation & Basics
✅ **Implemented:**
- React Environment - Create React App setup
- Folder Structure - organized component structure
- JSX introduction - JSX syntax throughout components
- Rendering Elements into DOM - ReactDOM.createRoot()

#### Components and Styles
✅ **Implemented:**
- Creating components - Functional components (Translator, History, App)
- Functional Components - all components use function syntax
- Props - components can receive props
- CSS in React - TailwindCSS integration
- Adding TailwindCSS - configured and used throughout

#### Events, States & Hooks
✅ **Implemented:**
- Event handling in React - onClick, onSubmit handlers
- Creating State - useState hook
- Stateful Components - components using useState
- useState hook - multiple state variables
- useEffect hook - fetching data on component mount

#### Forms
✅ **Implemented:**
- Adding forms - form element in Translator component
- Handling forms - onSubmit handler
- Controlled components - input values controlled by state
- Forms validation - error checking and displaying errors

#### HTTP Methods & Routing
✅ **Implemented:**
- Fetch() and Axios - using Axios for HTTP requests
- GET Requests - fetching translation history
- POST Requests - sending translation requests
- DELETE Action - deleting translations
- Conditional routing - showing different components based on state

## Troubleshooting

1. **MongoDB Connection Error**
   - Open MongoDB Compass and ensure it's connected to `mongodb://localhost:27017`
   - Check MONGODB_URI in .env file matches your MongoDB connection
   - The database `translator` will be created automatically on first use

2. **Port Already in Use**
   - Change PORT in .env file
   - Or kill the process using the port

3. **Translation API Error**
   - Check internet connection
   - The translation service requires internet access

4. **CORS Errors**
   - Ensure backend is running on port 5000
   - Check REACT_APP_API_URL in client environment

## License

ISC

## Author

Created as a Node.js project for academic purposes.

