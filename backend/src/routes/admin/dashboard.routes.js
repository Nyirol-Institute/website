const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/admin/dashboard.controller');
const { checkSessionAuth, checkSessionStaffOrAdmin, checkSessionAdmin } = require('../../middleware/auth.middleware');

// Login page (public)
router.get('/login', (req, res) => {
  // If already logged in, redirect to dashboard
  if (req.session && req.session.userId) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login');
});

// Dashboard (protected)
router.get('/dashboard', checkSessionAuth, dashboardController.renderDashboard);

// Applications management (staff and admin)
router.get('/applications', checkSessionAuth, checkSessionStaffOrAdmin, dashboardController.renderApplicationsPage);

// Programs management (admin only)
router.get('/programs', checkSessionAuth, checkSessionAdmin, dashboardController.renderProgramsPage);

// Students management (staff and admin)
router.get('/students', checkSessionAuth, checkSessionStaffOrAdmin, dashboardController.renderStudentsPage);

// Donations management (staff and admin)
router.get('/donations', checkSessionAuth, checkSessionStaffOrAdmin, dashboardController.renderDonationsPage);

// Volunteers management (staff and admin)
router.get('/volunteers', checkSessionAuth, checkSessionStaffOrAdmin, dashboardController.renderVolunteersPage);

// Users management (admin only)
router.get('/users', checkSessionAuth, checkSessionAdmin, dashboardController.renderUsersPage);

// API endpoints for dashboard data
router.get('/api/stats', checkSessionAuth, dashboardController.getDashboardStats);
router.get('/api/applications/stats', checkSessionAuth, checkSessionStaffOrAdmin, dashboardController.getApplicationStats);
router.get('/api/donations/stats', checkSessionAuth, checkSessionStaffOrAdmin, dashboardController.getDonationStats);
router.get('/api/students/stats', checkSessionAuth, checkSessionStaffOrAdmin, dashboardController.getStudentStats);

module.exports = router;