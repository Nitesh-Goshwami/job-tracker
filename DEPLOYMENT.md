# Job Tracker Deployment Guide

This guide will help you deploy your Job Tracker application to production.

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **MongoDB Atlas Account**: For production database (free tier available)
3. **Render Account**: For hosting (free tier available)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Get your connection string
6. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)

## Step 2: Deploy Backend to Render

1. **Sign up for Render**:
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Backend Service**:
   - **Name**: `job-tracker-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

4. **Set Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a strong random string
   - `NODE_ENV`: `production`
   - `PORT`: Leave empty (Render will set this)

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://job-tracker-backend.onrender.com`)

## Step 3: Deploy Frontend to Render

1. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure Frontend Service**:
   - **Name**: `job-tracker-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Plan**: Free

3. **Set Environment Variables**:
   - `REACT_APP_API_URL`: Your backend URL + `/api` (e.g., `https://job-tracker-backend.onrender.com/api`)

4. **Deploy**:
   - Click "Create Static Site"
   - Wait for deployment to complete
   - Your app will be available at the provided URL

## Step 4: Alternative Deployment Options

### Option A: Railway Deployment

1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy both services using the same configuration

### Option B: Heroku Deployment

1. Install Heroku CLI
2. Create `Procfile` in backend:
   ```
   web: node server.js
   ```
3. Deploy using Heroku CLI commands

### Option C: Vercel + Render

1. Deploy frontend to [Vercel](https://vercel.com)
2. Deploy backend to Render
3. Update frontend environment variables

## Step 5: Update Environment Variables

### Backend (.env)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker
JWT_SECRET=your-strong-jwt-secret-here
NODE_ENV=production
```

### Frontend (.env)
```bash
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## Step 6: Test Your Deployment

1. **Test Backend**:
   - Visit your backend URL
   - Should see: `{"message": "Job Tracker API is running!"}`

2. **Test Frontend**:
   - Visit your frontend URL
   - Register a new account
   - Test adding/editing jobs

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Check your connection string
   - Ensure IP whitelist includes 0.0.0.0/0
   - Verify database user credentials

2. **Build Failures**:
   - Check build logs in Render
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

3. **CORS Errors**:
   - Backend CORS is configured for all origins
   - Check if frontend URL is correct

4. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names match exactly

### Performance Optimization

1. **Enable Caching**:
   - Add Redis for session storage
   - Implement response caching

2. **Database Optimization**:
   - Add indexes to MongoDB collections
   - Use connection pooling

3. **Frontend Optimization**:
   - Enable gzip compression
   - Use CDN for static assets

## Security Considerations

1. **JWT Secret**: Use a strong, random string
2. **MongoDB**: Enable authentication and use strong passwords
3. **HTTPS**: All production URLs should use HTTPS
4. **Rate Limiting**: Consider adding rate limiting to your API
5. **Input Validation**: Ensure all inputs are properly validated

## Monitoring

1. **Render Dashboard**: Monitor service health and logs
2. **MongoDB Atlas**: Monitor database performance
3. **Application Logs**: Check Render logs for errors
4. **User Analytics**: Consider adding analytics to track usage

## Cost Optimization

1. **Free Tier Limits**: Be aware of Render's free tier limits
2. **Database**: MongoDB Atlas free tier includes 512MB
3. **Scaling**: Upgrade only when necessary

## Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **GitHub Issues**: Create issues in your repository for bugs

---

**Happy Deploying! 🚀**
