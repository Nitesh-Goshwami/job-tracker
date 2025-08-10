# 🚀 Quick Start: Deploy Job Tracker for FREE

## Why Railway + GitHub Pages?

| Platform | Cost | Sleep Time | Performance |
|----------|------|------------|-------------|
| **Render** | $14/month after free | 15 min inactivity | Good |
| **Railway + GitHub Pages** | **$0/month** | **Never sleeps** | **Better** |

## 🎯 3-Step Deployment

### Step 1: Deploy Backend to Railway
1. Go to [railway.app](https://railway.app) and sign up
2. Create new project → "Deploy from GitHub repo"
3. Select your `job-tracker` repository
4. Set environment variables in Railway dashboard:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker
   JWT_SECRET=your-strong-jwt-secret-here
   NODE_ENV=production
   PORT=3000
   ```

### Step 2: Deploy Frontend to GitHub Pages
1. Go to your GitHub repo → Settings → Pages
2. Source: Select "GitHub Actions"
3. Add repository secret:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-railway-backend-url.up.railway.app/api`

### Step 3: Push to Deploy
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## 📁 Files Created for You

- ✅ `railway.json` - Railway configuration
- ✅ `.github/workflows/deploy.yml` - GitHub Actions workflow
- ✅ `DEPLOYMENT_RAILWAY_GITHUB.md` - Detailed guide
- ✅ `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- ✅ `deploy.sh` / `deploy.bat` - Deployment scripts

## 🔗 Quick Links

- **Railway**: [railway.app](https://railway.app)
- **MongoDB Atlas**: [mongodb.com/atlas](https://mongodb.com/atlas)
- **GitHub Pages**: [pages.github.com](https://pages.github.com)

## 💰 Cost Savings

**You save $14/month** compared to Render!

---

**Ready to deploy? Run `./deploy.sh` (Linux/Mac) or `deploy.bat` (Windows)**
