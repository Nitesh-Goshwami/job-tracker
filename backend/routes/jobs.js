const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { protect } = require('../middleware/auth');

// Apply authentication middleware to all job routes
router.use(protect);

// GET all jobs for the authenticated user
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new job (automatically associated with authenticated user)
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.company || !req.body.position) {
      return res.status(400).json({ message: 'Company and position are required' });
    }
    
    // Create job with user ID
    const jobData = {
      ...req.body,
      user: req.user.id
    };

    const job = new Job(jobData);
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update job (only if it belongs to the authenticated user)
router.put('/:id', async (req, res) => {
  try {
    // Find job and ensure it belongs to the user
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if job belongs to user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this job' });
    }

    // Update the job
    job = await Job.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE job (only if it belongs to the authenticated user)
router.delete('/:id', async (req, res) => {
  try {
    // Find job and ensure it belongs to the user
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if job belongs to user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
