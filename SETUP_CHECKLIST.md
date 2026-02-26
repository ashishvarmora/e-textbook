# Setup Checklist

Use this checklist to ensure everything is properly configured.

## Prerequisites

- [ ] Node.js installed (v14 or higher)
  - Check: `node --version`
- [ ] npm installed
  - Check: `npm --version`
- [ ] MongoDB installed OR MongoDB Atlas account created
  - Local: `mongod --version`
  - Atlas: Connection string ready

## Backend Setup

- [ ] Navigated to `backend` folder
- [ ] Ran `npm install`
- [ ] Created `.env` file from `.env.example`
- [ ] Configured `MONGODB_URI` in `.env`
- [ ] Configured `PORT` in `.env` (default: 5000)
- [ ] Backend starts without errors: `npm start`
- [ ] See "MongoDB connected successfully" message
- [ ] See "Server running on port 5000" message
- [ ] Can access http://localhost:5000 in browser
- [ ] See JSON message: `{"message": "Digital Textbook API is running"}`

## Frontend Setup

- [ ] Navigated to `frontend` folder
- [ ] Ran `npm install`
- [ ] Created `.env` file from `.env.example`
- [ ] Configured `REACT_APP_API_URL` in `.env`
- [ ] Frontend starts without errors: `npm start`
- [ ] Browser opens automatically to http://localhost:3000
- [ ] See Digital Textbook dashboard
- [ ] See sidebar with "Digital Textbook" title
- [ ] No errors in browser console (F12)

## Database Setup

- [ ] MongoDB is running (local or Atlas)
- [ ] Connection string is correct
- [ ] Database user has read/write permissions (Atlas)
- [ ] Network access configured (Atlas - allow your IP or 0.0.0.0/0)
- [ ] Can run seed script: `cd backend && npm run seed`
- [ ] Seed script completes successfully
- [ ] Sample data appears in the app

## Functionality Tests

- [ ] Can create a new subject
- [ ] Can view subject details
- [ ] Can delete a subject
- [ ] Can create a chapter
- [ ] Can view chapter details
- [ ] Can delete a chapter
- [ ] Can create a topic
- [ ] Can view topic details
- [ ] Can delete a topic
- [ ] Can create a note
- [ ] Can edit a note
- [ ] Can delete a note
- [ ] Breadcrumb navigation works
- [ ] Data persists after page refresh
- [ ] Confirmation dialogs appear before deletion

## File Structure Verification

```
digital-textbook/
├── backend/
│   ├── config/
│   │   └── db.js ✓
│   ├── models/
│   │   ├── Subject.js ✓
│   │   ├── Chapter.js ✓
│   │   ├── Topic.js ✓
│   │   └── Note.js ✓
│   ├── routes/
│   │   ├── subjects.js ✓
│   │   ├── chapters.js ✓
│   │   ├── topics.js ✓
│   │   └── notes.js ✓
│   ├── .env ✓
│   ├── .env.example ✓
│   ├── package.json ✓
│   ├── seed.js ✓
│   └── server.js ✓
│
└── frontend/
    ├── public/
    │   └── index.html ✓
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.js ✓
    │   │   ├── Sidebar.css ✓
    │   │   ├── Loading.js ✓
    │   │   └── Loading.css ✓
    │   ├── pages/
    │   │   ├── Dashboard.js ✓
    │   │   ├── Dashboard.css ✓
    │   │   ├── ChapterView.js ✓
    │   │   ├── ChapterView.css ✓
    │   │   ├── TopicView.js ✓
    │   │   ├── TopicView.css ✓
    │   │   ├── NoteEditor.js ✓
    │   │   └── NoteEditor.css ✓
    │   ├── services/
    │   │   └── api.js ✓
    │   ├── App.js ✓
    │   ├── App.css ✓
    │   ├── index.js ✓
    │   └── index.css ✓
    ├── .env ✓
    ├── .env.example ✓
    └── package.json ✓
```

## Environment Variables Check

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital-textbook
NODE_ENV=development
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Common Issues Checklist

### Backend Won't Start
- [ ] Check if port 5000 is available
- [ ] Verify MongoDB is running
- [ ] Check .env file exists and is configured
- [ ] Run `npm install` again
- [ ] Check for error messages in terminal

### Frontend Won't Start
- [ ] Check if port 3000 is available
- [ ] Verify .env file exists
- [ ] Run `npm install` again
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Delete node_modules and reinstall

### Cannot Connect to Backend
- [ ] Backend is running on port 5000
- [ ] REACT_APP_API_URL is correct in frontend/.env
- [ ] No CORS errors in browser console
- [ ] Backend .env has correct configuration

### Database Connection Failed
- [ ] MongoDB service is running
- [ ] Connection string is correct
- [ ] Database user credentials are correct (Atlas)
- [ ] Network access is configured (Atlas)
- [ ] Firewall is not blocking connection

### Data Not Showing
- [ ] Backend is connected to database
- [ ] Run seed script to populate data
- [ ] Check browser console for API errors
- [ ] Verify API endpoints are working

## Performance Checklist

- [ ] Page loads in under 2 seconds
- [ ] API responses are fast (< 500ms)
- [ ] No memory leaks
- [ ] No console warnings
- [ ] Smooth navigation
- [ ] Forms submit quickly

## Security Checklist

- [ ] .env files are in .gitignore
- [ ] No credentials in code
- [ ] MongoDB connection uses authentication (production)
- [ ] CORS is properly configured
- [ ] Input validation works

## Deployment Readiness

- [ ] All tests pass locally
- [ ] No console errors
- [ ] Environment variables documented
- [ ] README is up to date
- [ ] Git repository is clean
- [ ] .gitignore is configured
- [ ] Production build works: `npm run build`

## Final Verification

Run through this complete flow:

1. [ ] Start backend: `cd backend && npm start`
2. [ ] Start frontend: `cd frontend && npm start`
3. [ ] Open http://localhost:3000
4. [ ] Create a subject named "Test"
5. [ ] Click "View Chapters"
6. [ ] Create a chapter named "Chapter 1"
7. [ ] Click "View Topics"
8. [ ] Create a topic named "Topic 1"
9. [ ] Click "View Notes"
10. [ ] Create a note with some content
11. [ ] Edit the note
12. [ ] Verify the note updated
13. [ ] Navigate back using breadcrumbs
14. [ ] Refresh the page
15. [ ] Verify data persists
16. [ ] Delete the note
17. [ ] Delete the topic
18. [ ] Delete the chapter
19. [ ] Delete the subject
20. [ ] Verify cascade deletion worked

## Success!

If all items are checked, your Digital Textbook application is fully functional! 🎉

## Next Steps

- [ ] Customize the styling
- [ ] Add more features
- [ ] Deploy to production
- [ ] Share with others
- [ ] Contribute improvements

## Need Help?

- Check TROUBLESHOOTING.md for detailed solutions
- Review README.md for complete documentation
- Check TEST_CONNECTION.md for testing guide
- Review error messages carefully
- Search for similar issues online
