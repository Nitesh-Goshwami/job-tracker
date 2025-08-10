# Frontend Deployment Guide

## Issues Fixed

1. ✅ **Cleaned package.json** - Removed unnecessary backend dependencies
2. ✅ **Fixed GitHub Actions workflow** - Updated to latest actions and simplified deployment
3. ✅ **Environment configuration** - Created proper .env file

## Steps to Deploy

### 1. Update Environment Variables

**IMPORTANT**: You need to update the `.env` file with your actual Railway backend URL:

```bash
# In job-tracker/frontend/.env
REACT_APP_API_URL=https://your-actual-railway-backend-url.up.railway.app/api
```

**Replace** `your-actual-railway-backend-url` with your real Railway backend URL.

### 2. Set GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add a new secret:
- **Name**: `REACT_APP_API_URL`
- **Value**: `https://your-actual-railway-backend-url.up.railway.app/api`

### 3. Enable GitHub Pages

1. Go to your repository → Settings → Pages
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` (this will be created automatically)
4. **Folder**: `/ (root)`
5. Click **Save**

### 4. Push Changes

```bash
git add .
git commit -m "Fix frontend deployment configuration"
git push origin main
```

### 5. Monitor Deployment

- Go to Actions tab in your repository
- Watch the "Deploy to GitHub Pages" workflow
- Wait for it to complete successfully

## Current Configuration

- **Frontend**: Will be deployed to GitHub Pages
- **Backend**: Already deployed on Railway
- **Database**: MongoDB (handled by backend)

## Troubleshooting

### Build Fails
- Check if `REACT_APP_API_URL` secret is set correctly
- Verify the backend URL is accessible

### Deployment Fails
- Ensure GitHub Pages is enabled
- Check if `gh-pages` branch was created
- Verify the workflow completed successfully

### App Not Working
- Check browser console for API errors
- Verify the backend URL in the deployed app
- Ensure CORS is properly configured on backend

## File Structure After Fix

```
frontend/
├── .env                    # Environment variables (UPDATE THIS!)
├── package.json           # Cleaned dependencies
├── src/                   # React source code
├── public/                # Static assets
└── build/                 # Build output (auto-generated)
```

## Next Steps

1. Update the `.env` file with your real Railway backend URL
2. Set the GitHub secret
3. Push the changes
4. Monitor the deployment
5. Test the deployed application
