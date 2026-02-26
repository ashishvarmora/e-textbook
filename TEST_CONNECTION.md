# Test Your Setup

## Quick Health Check

### 1. Test Backend Connection

Open your browser and visit:
```
http://localhost:5000
```

You should see:
```json
{"message": "Digital Textbook API is running"}
```

### 2. Test MongoDB Connection

Check your backend terminal. You should see:
```
MongoDB connected successfully
Server running on port 5000
```

### 3. Test Frontend

Open your browser and visit:
```
http://localhost:3000
```

You should see the Digital Textbook dashboard with a sidebar.

### 4. Test API Endpoints

#### Get All Subjects
```bash
curl http://localhost:5000/api/subjects
```

Should return an empty array `[]` or list of subjects.

#### Create a Subject (using curl)
```bash
curl -X POST http://localhost:5000/api/subjects \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Subject\",\"description\":\"Test Description\"}"
```

#### Create a Subject (using PowerShell)
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/subjects" -Method Post -ContentType "application/json" -Body '{"name":"Test Subject","description":"Test Description"}'
```

### 5. Test Full Flow in Browser

1. ✅ Open http://localhost:3000
2. ✅ Click "+ Add Subject"
3. ✅ Enter subject name and description
4. ✅ Click "Create Subject"
5. ✅ Click "View Chapters" on the subject
6. ✅ Click "+ Add Chapter"
7. ✅ Enter chapter title
8. ✅ Click "Create Chapter"
9. ✅ Click "View Topics" on the chapter
10. ✅ Click "+ Add Topic"
11. ✅ Enter topic title
12. ✅ Click "Create Topic"
13. ✅ Click "View Notes" on the topic
14. ✅ Click "+ Add Note"
15. ✅ Write some content
16. ✅ Click "Create Note"

## Common Issues

### Backend Issues

**Error: Cannot connect to MongoDB**
- Solution: Make sure MongoDB is running
- For local: Start MongoDB service
- For Atlas: Check connection string and network access

**Error: Port 5000 already in use**
- Solution: Change PORT in backend/.env to 5001
- Update frontend/.env REACT_APP_API_URL to http://localhost:5001/api

**Error: Module not found**
- Solution: Run `npm install` in backend folder

### Frontend Issues

**Error: Cannot connect to backend**
- Solution: Make sure backend is running on port 5000
- Check REACT_APP_API_URL in frontend/.env

**Error: Module not found**
- Solution: Run `npm install` in frontend folder

**Blank page**
- Solution: Check browser console (F12) for errors
- Make sure backend is running

### Database Issues

**No data showing**
- Solution: Run seed script: `cd backend && npm run seed`

**Data not persisting**
- Solution: Check MongoDB connection
- Verify MONGODB_URI in backend/.env

## Success Indicators

✅ Backend terminal shows "MongoDB connected successfully"
✅ Backend terminal shows "Server running on port 5000"
✅ Frontend opens at http://localhost:3000
✅ Can create subjects, chapters, topics, and notes
✅ Data persists after page refresh
✅ Can edit and delete items
✅ Breadcrumb navigation works

## Performance Check

- Page loads in < 2 seconds
- API responses in < 500ms
- No console errors
- Smooth navigation between pages

## Next Steps

If all tests pass:
1. ✅ Your setup is complete!
2. ✅ Start using the app
3. ✅ Read README.md for more features
4. ✅ Consider deploying to production

If tests fail:
1. ❌ Check TROUBLESHOOTING.md
2. ❌ Review error messages
3. ❌ Verify all dependencies installed
4. ❌ Check .env files are configured correctly
