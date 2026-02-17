# Deployment Guide

## Prerequisites

- GitHub account
- MongoDB Atlas account (free tier)
- Render account (for backend)
- Vercel account (for frontend)

---

## Part 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set role to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/digital-textbook?retryWrites=true&w=majority`

## mongodb+srv://ashish:ashish@cluster0.eriislk.mongodb.net/?appName=Cluster0
---

## Part 2: Backend Deployment (Render)

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: digital-textbook-api
     - **Root Directory**: backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add variables:
     ```
     MONGODB_URI = <your-mongodb-atlas-connection-string>
     NODE_ENV = production
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://digital-textbook-api.onrender.com`)
   ## https://digital-textbook-api.onrender.com

6. **Test Backend**
   - Visit: `https://your-app.onrender.com/`
   - Should see: `{"message": "Digital Textbook API is running"}`

---

## Part 3: Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: frontend
     - **Build Command**: `npm run build`
     - **Output Directory**: build

3. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL = https://your-render-backend-url.onrender.com/api
     ```
   - Make sure to use your actual Render backend URL!

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Your app will be live at: `https://your-app.vercel.app`

---

## Part 4: Post-Deployment

### Update CORS (if needed)

If you get CORS errors, update backend `server.js`:

```javascript
app.use(cors({
  origin: 'https://your-vercel-app.vercel.app',
  credentials: true
}));
```

Then redeploy backend on Render.

### Custom Domain (Optional)

**Vercel:**
- Go to project settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

**Render:**
- Go to service settings → Custom Domain
- Add your custom domain
- Update DNS records

---

## Continuous Deployment

Both Render and Vercel support automatic deployments:

- **Push to GitHub** → Automatically deploys
- **Main branch** → Production
- **Other branches** → Preview deployments (Vercel)

---

## Monitoring

### Render
- View logs in dashboard
- Monitor resource usage
- Set up alerts

### Vercel
- View deployment logs
- Analytics available
- Performance monitoring

### MongoDB Atlas
- Monitor database performance
- View connection metrics
- Set up alerts for storage

---

## Troubleshooting

### Backend Issues

**Build fails:**
- Check Node version compatibility
- Verify all dependencies in package.json
- Check build logs in Render

**Database connection fails:**
- Verify MongoDB connection string
- Check network access (0.0.0.0/0)
- Verify database user credentials

**API not responding:**
- Check Render logs for errors
- Verify service is running
- Test health endpoint

### Frontend Issues

**Build fails:**
- Check for syntax errors
- Verify all imports
- Check Vercel build logs

**Can't connect to backend:**
- Verify REACT_APP_API_URL is correct
- Check backend is running
- Verify CORS configuration

**Environment variables not working:**
- Must start with REACT_APP_
- Redeploy after adding variables
- Check they're set in Vercel dashboard

---

## Cost Considerations

### Free Tiers

- **MongoDB Atlas**: 512 MB storage (sufficient for personal use)
- **Render**: 750 hours/month (enough for 1 service)
- **Vercel**: Unlimited personal projects

### Limitations

- **Render Free**: Service sleeps after 15 min inactivity (cold start ~30s)
- **MongoDB Atlas Free**: 512 MB storage limit
- **Vercel Free**: 100 GB bandwidth/month

### Upgrade When Needed

- More storage → MongoDB Atlas paid tier
- No cold starts → Render paid tier ($7/month)
- More bandwidth → Vercel Pro ($20/month)

---

## Security Best Practices

1. **Never commit .env files**
2. **Use strong database passwords**
3. **Regularly update dependencies**
4. **Monitor for security alerts**
5. **Use HTTPS only (automatic on Render/Vercel)**
6. **Implement rate limiting for production**
7. **Add authentication for multi-user scenarios**

---

## Backup Strategy

### MongoDB Atlas
- Automatic backups on paid tiers
- Export data regularly:
  ```bash
  mongodump --uri="<connection-string>"
  ```

### Code
- Keep GitHub repository updated
- Tag releases
- Maintain changelog

---

## Support

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

---

**Your app is now live! 🎉**

Share your URL and start taking notes!
