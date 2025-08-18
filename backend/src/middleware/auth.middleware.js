const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {
  try {
    // Get token from header or session
    let token;
    
    // Check for token in Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    
    // If no token in header, check session
    if (!token && req.session && req.session.userId) {
      // Create token from session data
      token = jwt.sign(
        { id: req.session.userId, role: req.session.userRole },
        process.env.JWT_SECRET || 'nyirol_institute_secret',
        { expiresIn: '1h' }
      );
    }
    
    // If no token found, return unauthorized
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nyirol_institute_secret');
    
    // Add user info to request
    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.userEmail = decoded.email;
    
    // Check if user exists and is active
    const user = await User.findByPk(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token or user is inactive.'
      });
    }
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please log in again.'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.'
    });
  }
  
  next();
};

// Middleware to check if user is staff or admin
exports.isStaffOrAdmin = (req, res, next) => {
  if (req.userRole !== 'admin' && req.userRole !== 'staff') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Staff or admin role required.'
    });
  }
  
  next();
};

// Middleware to check if user is instructor, staff, or admin
exports.isInstructorOrAbove = (req, res, next) => {
  if (req.userRole !== 'admin' && req.userRole !== 'staff' && req.userRole !== 'instructor') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Instructor, staff, or admin role required.'
    });
  }
  
  next();
};

// Middleware to check session authentication for web routes
exports.checkSessionAuth = async (req, res, next) => {
  try {
    // If no session or userId, redirect to login
    if (!req.session || !req.session.userId) {
      return res.redirect('/admin/login');
    }
    
    // Check if user exists and is active
    const user = await User.findByPk(req.session.userId);
    if (!user || !user.isActive) {
      req.session.destroy();
      return res.redirect('/admin/login');
    }
    
    // Add user to request
    req.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    console.error('Session auth error:', error);
    req.session.destroy();
    return res.redirect('/admin/login');
  }
};

// Middleware to check if session user is admin
exports.checkSessionAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).render('admin/error', {
      message: 'Access denied. Admin privileges required.'
    });
  }
  
  next();
};

// Middleware to check if session user is staff or admin
exports.checkSessionStaffOrAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'staff')) {
    return res.status(403).render('admin/error', {
      message: 'Access denied. Staff or admin privileges required.'
    });
  }
  
  next();
};