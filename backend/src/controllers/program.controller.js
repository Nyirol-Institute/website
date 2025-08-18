const { Program, Specialization, Course } = require('../models');
const { validationResult } = require('express-validator');

// Get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({
      include: [
        { model: Specialization },
        { model: Course }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      count: programs.length,
      programs
    });
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get program by ID
exports.getProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const program = await Program.findByPk(id, {
      include: [
        { model: Specialization },
        { model: Course }
      ]
    });
    
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    
    res.status(200).json({
      success: true,
      program
    });
  } catch (error) {
    console.error('Get program error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new program (admin only)
exports.createProgram = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    const {
      name,
      slug,
      description,
      duration,
      type,
      applicationDeadline,
      startDate,
      endDate,
      capacity,
      requirements,
      outcomes,
      image
    } = req.body;
    
    // Check if slug is already in use
    const existingProgram = await Program.findOne({ where: { slug } });
    if (existingProgram) {
      return res.status(400).json({ success: false, message: 'A program with this slug already exists' });
    }
    
    // Create new program
    const program = await Program.create({
      name,
      slug,
      description,
      duration,
      type,
      applicationDeadline,
      startDate: startDate || null,
      endDate: endDate || null,
      capacity: capacity || null,
      requirements,
      outcomes,
      image,
      isActive: true
    });
    
    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      program
    });
  } catch (error) {
    console.error('Create program error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update program (admin only)
exports.updateProgram = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    const { id } = req.params;
    const {
      name,
      slug,
      description,
      duration,
      type,
      applicationDeadline,
      startDate,
      endDate,
      capacity,
      requirements,
      outcomes,
      image,
      isActive
    } = req.body;
    
    // Find program
    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    
    // Check if slug is already in use by another program
    if (slug !== program.slug) {
      const existingProgram = await Program.findOne({ where: { slug } });
      if (existingProgram) {
        return res.status(400).json({ success: false, message: 'A program with this slug already exists' });
      }
    }
    
    // Update program
    await program.update({
      name: name || program.name,
      slug: slug || program.slug,
      description: description || program.description,
      duration: duration || program.duration,
      type: type || program.type,
      applicationDeadline: applicationDeadline || program.applicationDeadline,
      startDate: startDate || program.startDate,
      endDate: endDate || program.endDate,
      capacity: capacity || program.capacity,
      requirements: requirements || program.requirements,
      outcomes: outcomes || program.outcomes,
      image: image || program.image,
      isActive: isActive !== undefined ? isActive : program.isActive
    });
    
    res.status(200).json({
      success: true,
      message: 'Program updated successfully',
      program
    });
  } catch (error) {
    console.error('Update program error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete program (admin only)
exports.deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find program
    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    
    // Check if program has associated applications
    const applicationCount = await Application.count({ where: { ProgramId: id } });
    if (applicationCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete program with existing applications. Consider deactivating it instead.'
      });
    }
    
    // Delete program
    await program.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Program deleted successfully'
    });
  } catch (error) {
    console.error('Delete program error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all specializations
exports.getAllSpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.findAll({
      include: [{ model: Program }],
      order: [['name', 'ASC']]
    });
    
    res.status(200).json({
      success: true,
      count: specializations.length,
      specializations
    });
  } catch (error) {
    console.error('Get specializations error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new specialization (admin only)
exports.createSpecialization = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    const {
      name,
      slug,
      description,
      icon,
      requirements,
      outcomes,
      programId
    } = req.body;
    
    // Check if program exists
    if (programId) {
      const program = await Program.findByPk(programId);
      if (!program) {
        return res.status(404).json({ success: false, message: 'Program not found' });
      }
    }
    
    // Check if slug is already in use
    const existingSpecialization = await Specialization.findOne({ where: { slug } });
    if (existingSpecialization) {
      return res.status(400).json({ success: false, message: 'A specialization with this slug already exists' });
    }
    
    // Create new specialization
    const specialization = await Specialization.create({
      name,
      slug,
      description,
      icon,
      requirements,
      outcomes,
      ProgramId: programId || null,
      isActive: true
    });
    
    res.status(201).json({
      success: true,
      message: 'Specialization created successfully',
      specialization
    });
  } catch (error) {
    console.error('Create specialization error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update specialization (admin only)
exports.updateSpecialization = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    const { id } = req.params;
    const {
      name,
      slug,
      description,
      icon,
      requirements,
      outcomes,
      programId,
      isActive
    } = req.body;
    
    // Find specialization
    const specialization = await Specialization.findByPk(id);
    if (!specialization) {
      return res.status(404).json({ success: false, message: 'Specialization not found' });
    }
    
    // Check if program exists
    if (programId) {
      const program = await Program.findByPk(programId);
      if (!program) {
        return res.status(404).json({ success: false, message: 'Program not found' });
      }
    }
    
    // Check if slug is already in use by another specialization
    if (slug !== specialization.slug) {
      const existingSpecialization = await Specialization.findOne({ where: { slug } });
      if (existingSpecialization) {
        return res.status(400).json({ success: false, message: 'A specialization with this slug already exists' });
      }
    }
    
    // Update specialization
    await specialization.update({
      name: name || specialization.name,
      slug: slug || specialization.slug,
      description: description || specialization.description,
      icon: icon || specialization.icon,
      requirements: requirements || specialization.requirements,
      outcomes: outcomes || specialization.outcomes,
      ProgramId: programId || specialization.ProgramId,
      isActive: isActive !== undefined ? isActive : specialization.isActive
    });
    
    res.status(200).json({
      success: true,
      message: 'Specialization updated successfully',
      specialization
    });
  } catch (error) {
    console.error('Update specialization error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: Program }],
      order: [['title', 'ASC']]
    });
    
    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new course (admin only)
exports.createCourse = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    const {
      title,
      code,
      description,
      duration,
      level,
      objectives,
      prerequisites,
      syllabus,
      materials,
      programId,
      image
    } = req.body;
    
    // Check if program exists
    if (programId) {
      const program = await Program.findByPk(programId);
      if (!program) {
        return res.status(404).json({ success: false, message: 'Program not found' });
      }
    }
    
    // Check if course code is already in use
    const existingCourse = await Course.findOne({ where: { code } });
    if (existingCourse) {
      return res.status(400).json({ success: false, message: 'A course with this code already exists' });
    }
    
    // Create new course
    const course = await Course.create({
      title,
      code,
      description,
      duration,
      level,
      objectives,
      prerequisites,
      syllabus,
      materials,
      ProgramId: programId || null,
      image,
      isActive: true
    });
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};