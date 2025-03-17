const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Get all assessments for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // For development: Create some sample assessments if none exist
    const count = await Assessment.countDocuments();
    if (count === 0) {
      await Assessment.create([
        {
          companyName: 'Acme Corp',
          priority: 'High',
          status: 'In Progress',
          percentComplete: 60,
          dueDate: new Date('2024-03-15'),
          assignedTo: req.user.userId
        },
        {
          companyName: 'TechStart Inc',
          priority: 'Medium',
          status: 'New',
          percentComplete: 0,
          dueDate: new Date('2024-03-30'),
          assignedTo: req.user.userId
        },
        {
          companyName: 'Global Solutions',
          priority: 'Low',
          status: 'Review',
          percentComplete: 90,
          dueDate: new Date('2024-03-10'),
          assignedTo: req.user.userId
        }
      ]);
    }

    const assessments = await Assessment.find({ assignedTo: req.user.userId });
    res.json(assessments);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ message: 'Error fetching assessments' });
  }
});

module.exports = router; 