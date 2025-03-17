const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    console.log('Received password:', password);

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // For development: Always recreate test user
    let user;
    if (email.toLowerCase() === 'jevans@impactnetworking.com') {
      console.log('Recreating test user...');
      try {
        // Delete existing test user and any other test users
        await User.deleteMany({ email: email.toLowerCase() });
        
        // Create new test user with plain password for development
        const plainPassword = '12345';
        console.log('Creating test user with password:', plainPassword);
        
        // Use a simpler salt round for development
        const hashedPassword = await bcrypt.hashSync(plainPassword, 8);
        console.log('Generated hashed password:', hashedPassword);
        
        user = new User({
          email: email.toLowerCase(),
          password: hashedPassword,
          role: 'manager',
          name: 'John Evans'
        });

        // Save without triggering the pre-save hook
        user = await User.create(user);
        
        console.log('Test user recreated successfully:', {
          id: user._id,
          email: user.email,
          role: user.role,
          hashedPassword: user.password
        });

        // Verify the password immediately after creation
        const verifyTest = await bcrypt.compareSync(plainPassword, user.password);
        console.log('Immediate verification test:', verifyTest);
      } catch (createError) {
        console.error('Error creating test user:', createError);
        throw createError;
      }
    } else {
      // For non-test users, just find the user
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      console.log('No user found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    console.log('Comparing passwords...');
    console.log('Stored hashed password:', user.password);
    console.log('Attempting to match with provided password:', password);
    const isMatch = await bcrypt.compareSync(password, user.password);
    console.log('Password comparison result:', isMatch);
    
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    console.log('Creating JWT token...');
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login successful for user:', {
      id: user._id,
      email: user.email,
      role: user.role
    });
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 