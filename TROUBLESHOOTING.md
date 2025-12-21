# Troubleshooting Guide

## "Something went wrong" Error

If you're getting "Something went wrong" error, follow these steps:

### 1. Install Dependencies
Make sure all packages are installed:
```bash
npm install
```

This will install:
- bcryptjs (for password hashing)
- jsonwebtoken (for JWT tokens)

### 2. Check Server is Running
Make sure your backend server is running on port 5000:
```bash
npm run server
```

You should see:
- "MongoDB Connected"
- "Server running on port 5000"

### 3. Check MongoDB Connection
- Open MongoDB Compass
- Connect to: `mongodb://localhost:27017`
- Make sure MongoDB is running

### 4. Check Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/translator
JWT_SECRET=your-secret-key-here
```

### 5. Check Browser Console
Open browser developer tools (F12) and check:
- Console tab for errors
- Network tab to see API requests
- Check if requests are going to correct URL

### 6. Common Errors

**"Cannot connect to server"**
- Server is not running
- Wrong API URL in frontend
- Port conflict

**"Registration failed" / "Login failed"**
- Check server console for detailed error
- MongoDB connection issue
- Missing dependencies

**"Invalid credentials"**
- Wrong email/password
- User doesn't exist (for login)

**"User already exists"**
- Email or username already registered
- Try different email/username

### 7. Test API Directly
Test the API using Postman or curl:

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### 8. Clear Browser Storage
If you have old tokens:
- Open browser console
- Run: `localStorage.clear()`
- Refresh page

### 9. Restart Everything
1. Stop server (Ctrl+C)
2. Stop frontend (Ctrl+C)
3. Run `npm install` again
4. Start server: `npm run server`
5. Start frontend: `npm run client` (in another terminal)





