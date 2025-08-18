const express = require('express');
const router = express.Router();
const programController = require('../controllers/program.controller');
const { 
  programValidation, 
  specializationValidation, 
  courseValidation,
  paginationValidation 
} = require('../middleware/validation.middleware');
const { verifyToken, isAdmin, isStaffOrAdmin } = require('../middleware/auth.middleware');

// Public routes
router.get('/', programController.getAllPrograms);
router.get('/:id', programController.getProgramById);
router.get('/specializations', programController.getAllSpecializations);
router.get('/courses', programController.getAllCourses);

// Protected routes (admin only)
router.post('/', verifyToken, isAdmin, programValidation, programController.createProgram);
router.put('/:id', verifyToken, isAdmin, programValidation, programController.updateProgram);
router.delete('/:id', verifyToken, isAdmin, programController.deleteProgram);

router.post('/specializations', verifyToken, isAdmin, specializationValidation, programController.createSpecialization);
router.put('/specializations/:id', verifyToken, isAdmin, specializationValidation, programController.updateSpecialization);

router.post('/courses', verifyToken, isAdmin, courseValidation, programController.createCourse);

module.exports = router;