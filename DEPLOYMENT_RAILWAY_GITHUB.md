# Job Tracker Deployment Guide: Railway + GitHub Pages

This guide will help you deploy your Job Tracker application using **Railway (Backend)** and **GitHub Pages (Frontend)** - both with generous free tiers!

## 🎯 Why This Combination?

### Railway Backend (Free Tier)
- ✅ **500 hours/month free** (about 20 days)
- ✅ **No sleeping** - always active
- ✅ **Better performance** than Render
- ✅ **Easy environment variable management**
- ✅ **Automatic deployments from GitHub**

### GitHub Pages Frontend (Completely Free)
- ✅ **Unlimited hosting**
- ✅ **Always active**
- ✅ **Custom domain support**
- ✅ **Automatic deployments from GitHub**
- ✅ **No bandwidth limits**

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **MongoDB Atlas Account**: For production database (free tier available)
3. **Railway Account**: For backend hosting (free tier available)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Get your connection string
6. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)

## Step 2: Deploy Backend to Railway

1. **Sign up for Railway**:
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Create New Project**:
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Choose your job-tracker repository

3. **Configure Backend Service**:
   - Railway will automatically detect it's a Node.js project
   - **Root Directory**: Leave empty (deploy from root)
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`

4. **Set Environment Variables**:
   - Click on your service → Variables tab
   - Add these variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker
     JWT_SECRET=your-strong-jwt-secret-here
     NODE_ENV=production
     PORT=3000
     ```

5. **Deploy**:
   - Railway will automatically deploy when you push to GitHub
   - Note your backend URL (e.g., `https://job-tracker-backend-production.up.railway.app`)

## Step 3: Deploy Frontend to GitHub Pages

1. **Enable GitHub Pages**:
   - Go to your GitHub repository
   - Click "Settings" → "Pages"
   - **Source**: Select "GitHub Actions"

2. **Create GitHub Actions Workflow**:
   - Create `.github/workflows/deploy.yml` in your repository
   - This will automatically build and deploy your React app

3. **Update Frontend Environment**:
   - Create `frontend/.env.production` with:
     ```
     REACT_APP_API_URL=https://your-railway-backend-url.up.railway.app/api
     ```

4. **Deploy**:
   - Push your changes to GitHub
   - GitHub Actions will automatically build and deploy
   - Your app will be available at: `https://yourusername.github.io/job-tracker`

## Step 4: GitHub Actions Workflow

Create this file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
        
    - name: Install Dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Build
      run: |
        cd frontend
        npm run build
      env:
        REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/build
```

## Step 5: Environment Variables

### Backend (Railway Dashboard)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker
JWT_SECRET=your-strong-jwt-secret-here
NODE_ENV=production
PORT=3000
```

### Frontend (GitHub Secrets)
1. Go to your repository → Settings → Secrets and variables → Actions
2. Add new repository secret:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-railway-backend-url.up.railway.app/api`

## Step 6: Test Your Deployment

1. **Test Backend**:
   - Visit your Railway backend URL
   - Should see: `{"message": "Job Tracker API is running!"}`

2. **Test Frontend**:
   - Visit your GitHub Pages URL
   - Register a new account
   - Test adding/editing jobs

## Troubleshooting

### Common Issues

1. **Railway Build Failures**:
   - Check Railway logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **GitHub Pages Build Failures**:
   - Check GitHub Actions logs
   - Verify environment variables are set
   - Check for build errors in the workflow

3. **CORS Errors**:
   - Backend CORS is configured for all origins
   - Check if frontend URL is correct in environment variables

4. **Environment Variables**:
   - Ensure all required variables are set in Railway
   - Check variable names match exactly

## Cost Comparison

| Platform | Backend | Frontend | Total |
|----------|---------|----------|-------|
| **Render** | $7/month after free tier | $7/month after free tier | $14/month |
| **Railway + GitHub Pages** | Free (500h/month) | Completely Free | **$0/month** |

## Monitoring

1. **Railway Dashboard**: Monitor backend health and logs
2. **GitHub Actions**: Monitor frontend builds and deployments
3. **MongoDB Atlas**: Monitor database performance

## Support

- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

**🎉 This deployment strategy saves you $14/month compared to Render!**
