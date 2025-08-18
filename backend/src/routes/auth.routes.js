const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { 
  registerValidation, 
  loginValidation, 
  passwordResetRequestValidation, 
  passwordResetValidation,
  changePasswordValidation
} = require('../middleware/validation.middleware');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Public routes
router.post('/login', loginValidation, authController.login);
router.post('/request-password-reset', passwordResetRequestValidation, authController.requestPasswordReset);
router.post('/reset-password', passwordResetValidation, authController.resetPassword);

// Protected routes
router.post('/logout', verifyToken, authController.logout);
router.get('/me', verifyToken, authController.getCurrentUser);
router.post('/change-password', verifyToken, changePasswordValidation, authController.changePassword);

// Admin-only routes
router.post('/register', verifyToken, isAdmin, registerValidation, authController.register);

module.exports = router;