const { Application, Program, Specialization } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

// Submit a new application
exports.submitApplication = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      location,
      programId,
      specializationId,
      educationLevel,
      computerExperience,
      motivationStatement,
      questions
    } = req.body;

    // Check if program exists
    const program = await Program.findByPk(programId);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    // Check if application deadline has passed
    const now = new Date();
    if (now > new Date(program.applicationDeadline)) {
      return res.status(400).json({
        success: false,
        message: 'The application deadline for this program has passed. Please check our website for future opportunities.',
        deadlinePassed: true
      });
    }

    // Check if specialization exists if provided
    if (specializationId) {
      const specialization = await Specialization.findByPk(specializationId);
      if (!specialization) {
        return res.status(404).json({ success: false, message: 'Specialization not found' });
      }
    }

    // Check if applicant has already applied to this program
    const existingApplication = await Application.findOne({
      where: {
        email,
        ProgramId: programId,
        status: {
          [Op.notIn]: ['rejected', 'withdrawn']
        }
      }
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this program. You can check your application status by contacting us.'
      });
    }

    // Create new application
    const application = await Application.create({
      firstName,
      lastName,
      email,
      phone,
      age,
      location,
      ProgramId: programId,
      SpecializationId: specializationId || null,
      educationLevel,
      computerExperience,
      motivationStatement,
      questions,
      applicationDate: new Date(),
      status: 'pending'
    });

    // TODO: Send confirmation email to applicant

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id
    });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ success: false, message: 'Server error during application submission' });
  }
};

// Get all applications (admin only)
exports.getAllApplications = async (req, res) => {
  try {
    const { status, program, page = 1, limit = 10 } = req.query;
    
    // Build query conditions
    const where = {};
    if (status) where.status = status;
    if (program) where.ProgramId = program;
    
    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get applications with pagination
    const { count, rows: applications } = await Application.findAndCountAll({
      where,
      include: [
        { model: Program },
        { model: Specialization, as: 'specialization' }
      ],
      order: [['applicationDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / limit);
    
    res.status(200).json({
      success: true,
      count,
      totalPages,
      currentPage: parseInt(page),
      applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get application by ID (admin or owner)
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await Application.findByPk(id, {
      include: [
        { model: Program },
        { model: Specialization, as: 'specialization' }
      ]
    });
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    // If not admin, check if user is the applicant
    if (req.userRole !== 'admin' && req.userEmail !== application.email) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this application' });
    }
    
    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update application status (admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    // Update status and related fields
    application.status = status;
    
    if (status === 'under_review') {
      application.reviewDate = new Date();
      application.reviewNotes = notes;
      application.reviewedBy = req.userId;
    } else if (status === 'interview') {
      application.interviewNotes = notes;
    } else if (status === 'accepted' || status === 'rejected' || status === 'waitlisted') {
      application.decisionDate = new Date();
      application.decisionNotes = notes;
      application.decisionBy = req.userId;
    }
    
    await application.save();
    
    // TODO: Send email notification to applicant about status change
    
    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Check application deadline status
exports.checkDeadlineStatus = async (req, res) => {
  try {
    const { programId } = req.params;
    
    const program = await Program.findByPk(programId);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    
    const now = new Date();
    const deadline = new Date(program.applicationDeadline);
    const isDeadlinePassed = now > deadline;
    
    // Calculate days remaining if deadline hasn't passed
    let daysRemaining = null;
    if (!isDeadlinePassed) {
      daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    }
    
    res.status(200).json({
      success: true,
      program: {
        id: program.id,
        name: program.name,
        applicationDeadline: program.applicationDeadline
      },
      isDeadlinePassed,
      daysRemaining,
      message: isDeadlinePassed 
        ? 'The application deadline for this program has passed. Please check our website for future opportunities.'
        : `Applications are open. Deadline is in ${daysRemaining} days.`
    });
  } catch (error) {
    console.error('Check deadline status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get application statistics (admin only)
exports.getApplicationStatistics = async (req, res) => {
  try {
    // Get total applications
    const totalApplications = await Application.count();
    
    // Get applications by status
    const pending = await Application.count({ where: { status: 'pending' } });
    const underReview = await Application.count({ where: { status: 'under_review' } });
    const interview = await Application.count({ where: { status: 'interview' } });
    const accepted = await Application.count({ where: { status: 'accepted' } });
    const rejected = await Application.count({ where: { status: 'rejected' } });
    const waitlisted = await Application.count({ where: { status: 'waitlisted' } });
    
    // Get applications by program
    const programStats = await Application.findAll({
      attributes: [
        'ProgramId',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      include: [
        {
          model: Program,
          attributes: ['name']
        }
      ],
      group: ['ProgramId'],
      raw: true
    });
    
    // Get applications by day for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailyApplications = await Application.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('applicationDate')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: {
        applicationDate: {
          [Op.gte]: thirtyDaysAgo
        }
      },
      group: [sequelize.fn('DATE', sequelize.col('applicationDate'))],
      order: [[sequelize.fn('DATE', sequelize.col('applicationDate')), 'ASC']],
      raw: true
    });
    
    res.status(200).json({
      success: true,
      statistics: {
        totalApplications,
        byStatus: {
          pending,
          underReview,
          interview,
          accepted,
          rejected,
          waitlisted
        },
        byProgram: programStats,
        dailyApplications
      }
    });
  } catch (error) {
    console.error('Get application statistics error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};