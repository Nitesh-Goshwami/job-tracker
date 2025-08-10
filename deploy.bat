@echo off
echo 🚀 Job Tracker Deployment Script (Railway + GitHub Pages)
echo ========================================================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Please initialize git first:
    echo    git init
    echo    git add .
    echo    git commit -m "Initial commit"
    echo    git remote add origin ^<your-github-repo-url^>
    echo    git push -u origin main
    pause
    exit /b 1
)

REM Check if changes are committed
git status --porcelain >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  You have uncommitted changes. Please commit them first:
    echo    git add .
    echo    git commit -m "Update before deployment"
    pause
    exit /b 1
)

echo ✅ Git repository is clean

REM Push to GitHub
echo 📤 Pushing to GitHub...
git push origin main

echo.
echo 🎯 Next Steps:
echo.
echo 🔧 BACKEND DEPLOYMENT (Railway):
echo 1. Go to https://railway.app and sign up
echo 2. Create new project → Deploy from GitHub repo
echo 3. Select your job-tracker repository
echo 4. Set environment variables in Railway dashboard:
echo    - MONGODB_URI: Your MongoDB Atlas connection string
echo    - JWT_SECRET: Generate a strong random string
echo    - NODE_ENV: production
echo    - PORT: 3000
echo 5. Note your Railway backend URL
echo.
echo 🌐 FRONTEND DEPLOYMENT (GitHub Pages):
echo 1. Go to your GitHub repository → Settings → Pages
echo 2. Source: Select 'GitHub Actions'
echo 3. Add repository secret:
echo    - Name: REACT_APP_API_URL
echo    - Value: https://your-railway-backend-url.up.railway.app/api
echo 4. Push changes to trigger automatic deployment
echo.
echo 📚 See DEPLOYMENT_RAILWAY_GITHUB.md for detailed instructions
echo 🔗 Railway: https://railway.app
echo 🔗 MongoDB Atlas: https://www.mongodb.com/atlas
echo 🔗 GitHub Pages: https://pages.github.com
echo.
echo 💰 COST SAVINGS: This setup is FREE vs $14/month with Render!
pause
