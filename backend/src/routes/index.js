const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const applicationRoutes = require('./application.routes');
const programRoutes = require('./program.routes');
const adminDashboardRoutes = require('./admin/dashboard.routes');

// API routes
router.use('/auth', authRoutes);
router.use('/applications', applicationRoutes);
router.use('/programs', programRoutes);

// Admin dashboard routes
router.use('/admin', adminDashboardRoutes);

// Root route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Nyirol Institute of Innovation and Technology API',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

module.exports = router;