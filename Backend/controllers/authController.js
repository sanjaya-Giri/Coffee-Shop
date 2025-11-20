import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const adminSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('Signup attempt:', { username, email });

    // Check if any admin already exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Admin account already exists. Only one admin allowed.'
      });
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password
    });

    console.log('Admin created:', admin._id);

    // Generate token
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating admin account',
      error: error.message
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // ✅ FIXED: Remove single session restriction
    // Allow login anytime with valid credentials
    
    // Generate new token and update admin
    const token = generateToken(admin._id);
    
    admin.isLoggedIn = true;
    admin.currentToken = token;
    admin.lastLogin = new Date();
    await admin.save();

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (admin) {
      admin.isLoggedIn = false;
      admin.currentToken = null;
      await admin.save();
    }

    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const checkAdminExists = async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    res.json({
      success: true,
      adminExists: adminCount > 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Optional: Force reset all sessions (for emergencies)
export const forceLogoutAll = async (req, res) => {
  try {
    await Admin.updateMany({}, { 
      isLoggedIn: false, 
      currentToken: null 
    });

    res.json({
      success: true,
      message: 'All admin sessions reset successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error resetting sessions',
      error: error.message
    });
  }
};