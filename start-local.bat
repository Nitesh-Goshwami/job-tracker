@echo off
echo 🚀 Starting Job Tracker Locally
echo ===============================

REM Check if .env files exist
if not exist "backend\.env" (
    echo ⚠️  Backend .env file not found. Creating from template...
    copy backend\env.example backend\.env
    echo ✅ Backend .env created. Please update with your values.
)

if not exist "frontend\.env" (
    echo ⚠️  Frontend .env file not found. Creating from template...
    copy frontend\env.example frontend\.env
    echo ✅ Frontend .env created. Please update with your values.
)

echo.
echo 📦 Installing dependencies...

REM Install backend dependencies
echo Installing backend dependencies...
cd backend && npm install && cd ..

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend && npm install && cd ..

echo.
echo 🎯 Starting services...
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.
echo Press Ctrl+C to stop all services

REM Start both services concurrently
start "Backend" cmd /k "cd backend && npm run dev"
start "Frontend" cmd /k "cd frontend && npm start"

echo Services started in separate windows.
echo Close the windows to stop the services.
pause
