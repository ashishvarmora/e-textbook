# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install MongoDB (if not already installed)

**Option A: Local MongoDB**
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your MongoDB URI
# For local: MONGODB_URI=mongodb://localhost:27017/digital-textbook
# For Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-textbook

# Start server
npm start
```

Backend should now be running on http://localhost:5000

### Step 3: Setup Frontend

Open a new terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Start React app
npm start
```

Frontend should open automatically at http://localhost:3000

### Step 4: Start Using!

1. Create your first subject
2. Add chapters to it
3. Add topics to chapters
4. Write notes in topics

## 📝 Common Commands

### Backend
```bash
npm start          # Start server
npm run dev        # Start with auto-reload (requires nodemon)
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
```

## ⚠️ Troubleshooting

**Port already in use?**
- Backend: Change PORT in backend/.env
- Frontend: It will prompt to use different port

**Can't connect to MongoDB?**
- Check MongoDB is running: `mongod --version`
- Verify connection string in .env

**Frontend can't reach backend?**
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in frontend/.env

## 🎯 Next Steps

- Read full README.md for detailed documentation
- Explore API endpoints
- Customize styling in CSS files
- Deploy to Render (backend) and Vercel (frontend)

---

Need help? Check the main README.md file!
