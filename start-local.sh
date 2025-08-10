#!/bin/bash

echo "🚀 Starting Job Tracker Locally"
echo "==============================="

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Creating from template..."
    cp backend/env.example backend/.env
    echo "✅ Backend .env created. Please update with your values."
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  Frontend .env file not found. Creating from template..."
    cp frontend/env.example frontend/.env
    echo "✅ Frontend .env created. Please update with your values."
fi

echo ""
echo "📦 Installing dependencies..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend && npm install && cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo ""
echo "🎯 Starting services..."
echo "Backend will run on http://localhost:5000"
echo "Frontend will run on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Start both services concurrently
cd backend && npm run dev &
BACKEND_PID=$!

cd frontend && npm start &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
