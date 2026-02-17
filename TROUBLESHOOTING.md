# 🔧 Troubleshooting Guide

## Common Issues and Solutions

---

## Backend Issues

### ❌ Error: "Cannot find module 'express'"

**Problem**: Dependencies not installed

**Solution**:
```bash
cd backend
npm install
```

---

### ❌ Error: "MongoDB connection error"

**Problem**: MongoDB not running or wrong connection string

**Solutions**:

**For Local MongoDB**:
1. Check if MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl status mongod
   ```

2. Start MongoDB if not running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

3. Verify connection string in `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/digital-textbook
   ```

**For MongoDB Atlas**:
1. Check connection string format:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-textbook?retryWrites=true&w=majority
   ```

2. Verify:
   - Username and password are correct
   - Network access allows your IP (0.0.0.0/0)
   - Database user has read/write permissions

---

### ❌ Error: "Port 5000 already in use"

**Problem**: Another process using port 5000

**Solutions**:

**Option 1: Change port**
```env
# In backend/.env
PORT=5001
```

**Option 2: Kill process using port 5000**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

---

### ❌ Error: ".env file not found"

**Problem**: Environment file missing

**Solution**:
```bash
cd backend
copy .env.example .env
# Edit .env with your values
```

---

### ❌ Error: "ValidationError: Subject validation failed"

**Problem**: Required fields missing in request

**Solution**:
- Ensure `name` field is provided when creating subject
- Check request body format:
  ```json
  {
    "name": "Subject Name",
    "description": "Optional description"
  }
  ```

---

## Frontend Issues

### ❌ Error: "Cannot find module 'react'"

**Problem**: Dependencies not installed

**Solution**:
```bash
cd frontend
npm install
```

---

### ❌ Error: "Failed to fetch" or "Network Error"

**Problem**: Frontend can't connect to backend

**Solutions**:

1. **Check backend is running**:
   - Open http://localhost:5000
   - Should see: `{"message": "Digital Textbook API is running"}`

2. **Verify API URL in frontend/.env**:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Restart frontend after changing .env**:
   ```bash
   # Stop with Ctrl+C, then:
   npm start
   ```

4. **Check CORS configuration** in backend/server.js:
   ```javascript
   app.use(cors());
   ```

---

### ❌ Error: "Blank page" or "White screen"

**Problem**: JavaScript error or build issue

**Solutions**:

1. **Check browser console** (F12):
   - Look for error messages
   - Fix any import errors

2. **Clear cache and rebuild**:
   ```bash
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

3. **Check for syntax errors** in React components

---

### ❌ Error: "Module not found: Can't resolve './components/...'"

**Problem**: Incorrect import path or file doesn't exist

**Solutions**:

1. **Check file exists**:
   ```bash
   ls src/components/
   ```

2. **Verify import path**:
   ```javascript
   // Correct
   import Sidebar from './components/Sidebar';
   
   // Wrong
   import Sidebar from './component/Sidebar';
   ```

3. **Check file extension** (.js vs .jsx)

---

### ❌ Environment variables not working

**Problem**: React not reading .env file

**Solutions**:

1. **Ensure variable starts with REACT_APP_**:
   ```env
   # Correct
   REACT_APP_API_URL=http://localhost:5000/api
   
   # Wrong (won't work)
   API_URL=http://localhost:5000/api
   ```

2. **Restart development server**:
   ```bash
   # Stop with Ctrl+C, then:
   npm start
   ```

3. **Check .env is in frontend root** (not src/)

---

## Database Issues

### ❌ Error: "Authentication failed"

**Problem**: Wrong MongoDB credentials

**Solution**:
1. Verify username and password in connection string
2. Check database user exists in MongoDB Atlas
3. Ensure user has correct permissions

---

### ❌ Error: "Database not found"

**Problem**: Database doesn't exist yet

**Solution**:
- MongoDB creates database automatically on first write
- Just start using the app, database will be created
- Or run seed script: `npm run seed`

---

### ❌ Data not persisting

**Problem**: Using wrong database or connection issues

**Solutions**:

1. **Check database name in connection string**:
   ```env
   mongodb://localhost:27017/digital-textbook
   #                          ^^^^^^^^^^^^^^^^
   #                          Database name
   ```

2. **Verify data in MongoDB**:
   - Use MongoDB Compass
   - Connect to your database
   - Check collections exist

---

## Deployment Issues

### ❌ Render: "Build failed"

**Problem**: Build errors or missing dependencies

**Solutions**:

1. **Check build logs** in Render dashboard

2. **Verify package.json** has all dependencies

3. **Test build locally**:
   ```bash
   cd backend
   npm install
   npm start
   ```

4. **Check Node version**:
   - Render uses Node 14+ by default
   - Add `.node-version` file if needed:
     ```
     18.17.0
     ```

---

### ❌ Render: "Application failed to respond"

**Problem**: Server not starting or wrong port

**Solutions**:

1. **Check environment variables** in Render:
   - MONGODB_URI is set
   - PORT is not hardcoded (use process.env.PORT)

2. **Verify server.js**:
   ```javascript
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

3. **Check logs** for error messages

---

### ❌ Vercel: "Build failed"

**Problem**: Build errors in React app

**Solutions**:

1. **Check build logs** in Vercel dashboard

2. **Test build locally**:
   ```bash
   cd frontend
   npm run build
   ```

3. **Fix any warnings/errors** shown during build

4. **Verify root directory** is set to `frontend` in Vercel

---

### ❌ Vercel: "API calls failing"

**Problem**: Wrong API URL or CORS issues

**Solutions**:

1. **Check environment variable** in Vercel:
   ```
   REACT_APP_API_URL = https://your-backend.onrender.com/api
   ```

2. **Redeploy** after adding environment variable

3. **Update CORS** in backend if needed:
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend.vercel.app'
   }));
   ```

---

### ❌ MongoDB Atlas: "IP not whitelisted"

**Problem**: Network access restricted

**Solution**:
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Save

---

## Performance Issues

### ❌ Slow loading times

**Solutions**:

1. **Add loading states** (already implemented)

2. **Optimize database queries**:
   - Add indexes to frequently queried fields
   - Use pagination for large datasets

3. **Enable caching**:
   ```javascript
   // In Express
   app.use(express.static('public', { maxAge: '1d' }));
   ```

4. **Compress responses**:
   ```bash
   npm install compression
   ```
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

---

### ❌ Render free tier: Cold starts

**Problem**: Service sleeps after 15 min inactivity

**Solutions**:

1. **Upgrade to paid tier** ($7/month) for always-on

2. **Use ping service** to keep alive:
   - UptimeRobot (free)
   - Cron-job.org (free)
   - Ping every 10 minutes

3. **Accept cold starts** (30 seconds first load)

---

## Development Issues

### ❌ Changes not reflecting

**Problem**: Cache or build issues

**Solutions**:

1. **Hard refresh browser**:
   - Windows/Linux: Ctrl + Shift + R
   - Mac: Cmd + Shift + R

2. **Clear React cache**:
   ```bash
   rm -rf node_modules/.cache
   npm start
   ```

3. **Restart development server**

---

### ❌ ESLint errors

**Problem**: Code style issues

**Solutions**:

1. **Fix automatically**:
   ```bash
   npm run lint --fix
   ```

2. **Disable specific rules** in package.json:
   ```json
   "eslintConfig": {
     "extends": ["react-app"],
     "rules": {
       "no-unused-vars": "warn"
     }
   }
   ```

---

## Testing Issues

### ❌ Seed script fails

**Problem**: Database connection or data issues

**Solutions**:

1. **Check MongoDB is running**

2. **Verify .env file** exists with correct URI

3. **Run with error details**:
   ```bash
   node seed.js
   ```

4. **Clear database first**:
   ```javascript
   // In MongoDB shell
   use digital-textbook
   db.dropDatabase()
   ```

---

## Browser Issues

### ❌ CORS errors in console

**Problem**: Cross-origin request blocked

**Solution**:
```javascript
// In backend/server.js
const cors = require('cors');
app.use(cors());
```

---

### ❌ Cookies not working

**Problem**: SameSite or secure flags

**Solution**:
```javascript
// If using cookies (for future auth)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## Getting Help

### Still stuck?

1. **Check browser console** (F12) for errors
2. **Check backend logs** for error messages
3. **Check MongoDB logs** for database issues
4. **Search error message** on Google/Stack Overflow
5. **Check GitHub Issues** for similar problems
6. **Ask for help**:
   - Create GitHub issue
   - Include error message
   - Include steps to reproduce
   - Include environment details

---

### Useful Commands

**Check versions**:
```bash
node --version
npm --version
mongod --version
```

**Check running processes**:
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :5000
lsof -i :3000
```

**Clear everything and start fresh**:
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Prevention Tips

1. ✅ Always check .env files exist
2. ✅ Keep dependencies updated
3. ✅ Test locally before deploying
4. ✅ Check logs regularly
5. ✅ Use version control (Git)
6. ✅ Document changes
7. ✅ Test on multiple browsers
8. ✅ Monitor database size
9. ✅ Backup data regularly
10. ✅ Keep MongoDB Atlas IP whitelist updated

---

**Need more help? Create an issue on GitHub!** 🚀
