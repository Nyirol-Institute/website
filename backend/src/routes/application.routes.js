const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const { applicationValidation, applicationStatusValidation, paginationValidation } = require('../middleware/validation.middleware');
const { verifyToken, isStaffOrAdmin } = require('../middleware/auth.middleware');

// Public routes
router.post('/', applicationValidation, applicationController.submitApplication);
router.get('/deadline/:programId', applicationController.checkDeadlineStatus);

// Protected routes (staff and admin only)
router.get('/', verifyToken, isStaffOrAdmin, paginationValidation, applicationController.getAllApplications);
router.get('/:id', verifyToken, isStaffOrAdmin, applicationController.getApplicationById);
router.put('/:id/status', verifyToken, isStaffOrAdmin, applicationStatusValidation, applicationController.updateApplicationStatus);
router.get('/statistics', verifyToken, isStaffOrAdmin, applicationController.getApplicationStatistics);

module.exports = router;