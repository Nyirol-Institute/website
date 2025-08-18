const { 
  Application, 
  Program, 
  Student, 
  Donation, 
  Volunteer, 
  User,
  Course,
  Specialization,
  sequelize
} = require('../../models');
const { Op } = require('sequelize');

// Get dashboard overview statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Get counts for main entities
    const totalApplications = await Application.count();
    const totalStudents = await Student.count();
    const totalDonations = await Donation.count();
    const totalVolunteers = await Volunteer.count();
    
    // Get pending applications
    const pendingApplications = await Application.count({
      where: { status: 'pending' }
    });
    
    // Get total donation amount
    const donationResult = await Donation.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      where: { status: 'completed' },
      raw: true
    });
    const totalDonationAmount = donationResult.totalAmount || 0;
    
    // Get recent applications
    const recentApplications = await Application.findAll({
      include: [{ model: Program }],
      order: [['applicationDate', 'DESC']],
      limit: 5
    });
    
    // Get application statistics by program
    const applicationsByProgram = await Application.findAll({
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
    
    // Get application statistics by status
    const applicationsByStatus = await Application.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['status'],
      raw: true
    });
    
    // Get recent donations
    const recentDonations = await Donation.findAll({
      attributes: ['id', 'firstName', 'lastName', 'amount', 'donationDate', 'status'],
      order: [['donationDate', 'DESC']],
      limit: 5
    });
    
    // Get active programs
    const activePrograms = await Program.count({
      where: { isActive: true }
    });
    
    res.status(200).json({
      success: true,
      stats: {
        counts: {
          totalApplications,
          pendingApplications,
          totalStudents,
          totalDonations,
          totalDonationAmount,
          totalVolunteers,
          activePrograms
        },
        recentApplications,
        applicationsByProgram,
        applicationsByStatus,
        recentDonations
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get application statistics
exports.getApplicationStats = async (req, res) => {
  try {
    // Get applications by date (last 30 days)
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
    
    // Get applications by status
    const applicationsByStatus = await Application.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['status'],
      raw: true
    });
    
    // Get applications by program
    const applicationsByProgram = await Application.findAll({
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
    
    // Get applications by education level
    const applicationsByEducation = await Application.findAll({
      attributes: [
        'educationLevel',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['educationLevel'],
      raw: true
    });
    
    // Get applications by computer experience
    const applicationsByExperience = await Application.findAll({
      attributes: [
        'computerExperience',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['computerExperience'],
      raw: true
    });
    
    res.status(200).json({
      success: true,
      stats: {
        dailyApplications,
        applicationsByStatus,
        applicationsByProgram,
        applicationsByEducation,
        applicationsByExperience
      }
    });
  } catch (error) {
    console.error('Application stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get donation statistics
exports.getDonationStats = async (req, res) => {
  try {
    // Get total donation amount
    const totalResult = await Donation.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      where: { status: 'completed' },
      raw: true
    });
    const totalDonationAmount = totalResult.totalAmount || 0;
    
    // Get donations by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailyDonations = await Donation.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('donationDate')), 'date'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'amount']
      ],
      where: {
        donationDate: {
          [Op.gte]: thirtyDaysAgo
        },
        status: 'completed'
      },
      group: [sequelize.fn('DATE', sequelize.col('donationDate'))],
      order: [[sequelize.fn('DATE', sequelize.col('donationDate')), 'ASC']],
      raw: true
    });
    
    // Get donations by frequency
    const donationsByFrequency = await Donation.findAll({
      attributes: [
        'frequency',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'amount']
      ],
      where: { status: 'completed' },
      group: ['frequency'],
      raw: true
    });
    
    // Get donations by payment method
    const donationsByPaymentMethod = await Donation.findAll({
      attributes: [
        'paymentMethod',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'amount']
      ],
      where: { status: 'completed' },
      group: ['paymentMethod'],
      raw: true
    });
    
    // Get donations by allocation
    const donationsByAllocation = await Donation.findAll({
      attributes: [
        'allocation',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'amount']
      ],
      where: { status: 'completed' },
      group: ['allocation'],
      raw: true
    });
    
    res.status(200).json({
      success: true,
      stats: {
        totalDonationAmount,
        dailyDonations,
        donationsByFrequency,
        donationsByPaymentMethod,
        donationsByAllocation
      }
    });
  } catch (error) {
    console.error('Donation stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get student statistics
exports.getStudentStats = async (req, res) => {
  try {
    // Get total students
    const totalStudents = await Student.count();
    
    // Get students by status
    const studentsByStatus = await Student.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['status'],
      raw: true
    });
    
    // Get students by program
    const studentsByProgram = await sequelize.query(`
      SELECT p.name, COUNT(sp.StudentId) as count
      FROM Programs p
      LEFT JOIN StudentProgram sp ON p.id = sp.ProgramId
      GROUP BY p.id, p.name
    `, { type: sequelize.QueryTypes.SELECT });
    
    // Get students by gender
    const studentsByGender = await Student.findAll({
      attributes: [
        'gender',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['gender'],
      raw: true
    });
    
    // Get students by education level
    const studentsByEducation = await Student.findAll({
      attributes: [
        'educationLevel',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['educationLevel'],
      raw: true
    });
    
    // Get students by enrollment date (by month)
    const studentsByMonth = await Student.findAll({
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('enrollmentDate'), '%Y-%m'), 'month'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: [sequelize.fn('DATE_FORMAT', sequelize.col('enrollmentDate'), '%Y-%m')],
      order: [[sequelize.fn('DATE_FORMAT', sequelize.col('enrollmentDate'), '%Y-%m'), 'ASC']],
      raw: true
    });
    
    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        studentsByStatus,
        studentsByProgram,
        studentsByGender,
        studentsByEducation,
        studentsByMonth
      }
    });
  } catch (error) {
    console.error('Student stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Render admin dashboard page
exports.renderDashboard = async (req, res) => {
  try {
    // Get basic stats for rendering
    const totalApplications = await Application.count();
    const pendingApplications = await Application.count({ where: { status: 'pending' } });
    const totalStudents = await Student.count();
    const totalDonations = await Donation.count();
    
    // Get donation amount
    const donationResult = await Donation.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      where: { status: 'completed' },
      raw: true
    });
    const totalDonationAmount = donationResult.totalAmount || 0;
    
    // Get recent applications
    const recentApplications = await Application.findAll({
      include: [{ model: Program }],
      order: [['applicationDate', 'DESC']],
      limit: 5
    });
    
    res.render('admin/dashboard', {
      user: req.user,
      stats: {
        totalApplications,
        pendingApplications,
        totalStudents,
        totalDonations,
        totalDonationAmount
      },
      recentApplications
    });
  } catch (error) {
    console.error('Render dashboard error:', error);
    res.status(500).render('admin/error', {
      message: 'Error loading dashboard',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Render applications management page
exports.renderApplicationsPage = async (req, res) => {
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
    
    // Get all programs for filter
    const programs = await Program.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / limit);
    
    res.render('admin/applications', {
      user: req.user,
      applications,
      programs,
      filters: {
        status,
        program
      },
      pagination: {
        count,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Render applications page error:', error);
    res.status(500).render('admin/error', {
      message: 'Error loading applications',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Render programs management page
exports.renderProgramsPage = async (req, res) => {
  try {
    // Get all programs
    const programs = await Program.findAll({
      include: [
        { model: Specialization },
        { model: Course }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.render('admin/programs', {
      user: req.user,
      programs
    });
  } catch (error) {
    console.error('Render programs page error:', error);
    res.status(500).render('admin/error', {
      message: 'Error loading programs',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Render students management page
exports.renderStudentsPage = async (req, res) => {
  try {
    const { status, program, page = 1, limit = 10 } = req.query;
    
    // Build query conditions
    const where = {};
    if (status) where.status = status;
    
    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get students with pagination
    const { count, rows: students } = await Student.findAndCountAll({
      where,
      order: [['lastName', 'ASC'], ['firstName', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / limit);
    
    res.render('admin/students', {
      user: req.user,
      students,
      filters: {
        status,
        program
      },
      pagination: {
        count,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Render students page error:', error);
    res.status(500).render('admin/error', {
      message: 'Error loading students',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Render donations management page
exports.renderDonationsPage = async (req, res) => {
  try {
    const { status, frequency, page = 1, limit = 10 } = req.query;
    
    // Build query conditions
    const where = {};
    if (status) where.status = status;
    if (frequency) where.frequency = frequency;
    
    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get donations with pagination
    const { count, rows: donations } = await Donation.findAndCountAll({
      where,
      order: [['donationDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / limit);
    
    // Get total donation amount
    const donationResult = await Donation.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      where: { status: 'completed' },
      raw: true
    });
    const totalDonationAmount = donationResult.totalAmount || 0;
    
    res.render('admin/donations', {
      user: req.user,
      donations,
      totalDonationAmount,
      filters: {
        status,
        frequency
      },
      pagination: {
        count,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Render donations page error:', error);
    res.status(500).render('admin/error', {
      message: 'Error loading donations',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Render volunteers management page
exports.renderVolunteersPage = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    
    // Build query conditions
    const where = {};
    if (status) where.status = status;
    if (type) where.volunteerType = type;
    
    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get volunteers with pagination
    const { count, rows: volunteers } = await Volunteer.findAndCountAll({
      where,
      order: [['applicationDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / limit);
    
    res.render('admin/volunteers', {
      user: req.user,
      volunteers,
      filters: {
        status,
        type
      },
      pagination: {
        count,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Render volunteers page error:', error);
    res.status(500).render('admin/error', {
      message: 'Error loading volunteers',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Render users management page
exports.renderUsersPage = async (req, res) => {
  try {
    const { role, page = 1, limit = 10 } = req.query;
    
    // Build query conditions
    const where = {};
    if (role) where.role = role;
    
    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get users with pagination
    const { count, rows: users } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password', 'resetPasswordToken', 'resetPasswordExpires'] },
      order: [['lastName', 'ASC'], ['firstName', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / limit);
    
    res.render('admin/users', {
      user: req.user,
      users,
      filters: {
        role
      },
      pagination: {
        count,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Render users page error:', error);
    res.status(500).render('admin/error', {
      message: 'Error loading users',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};