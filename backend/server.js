const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-tracker';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Please check your MONGODB_URI in the .env file');
    console.log('You can copy env.example to .env and update the values');
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Job Tracker API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'Using default (not recommended for production)'}`);
});
