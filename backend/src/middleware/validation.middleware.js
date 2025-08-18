const { body, param, query } = require('express-validator');

// User validation rules
exports.registerValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('role')
    .optional()
    .isIn(['admin', 'staff', 'instructor']).withMessage('Invalid role')
];

exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
];

exports.passwordResetRequestValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail()
];

exports.passwordResetValidation = [
  body('token')
    .trim()
    .notEmpty().withMessage('Token is required'),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

exports.changePasswordValidation = [
  body('currentPassword')
    .trim()
    .notEmpty().withMessage('Current password is required'),
  
  body('newPassword')
    .trim()
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Application validation rules
exports.applicationValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .isLength({ min: 10, max: 15 }).withMessage('Please provide a valid phone number'),
  
  body('age')
    .isInt({ min: 16, max: 100 }).withMessage('Age must be between 16 and 100'),
  
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required'),
  
  body('programId')
    .isInt().withMessage('Invalid program ID'),
  
  body('specializationId')
    .optional({ nullable: true })
    .isInt().withMessage('Invalid specialization ID'),
  
  body('educationLevel')
    .isIn(['primary', 'secondary', 'diploma', 'bachelors', 'masters', 'other']).withMessage('Invalid education level'),
  
  body('computerExperience')
    .isIn(['none', 'basic', 'intermediate', 'advanced']).withMessage('Invalid computer experience level'),
  
  body('motivationStatement')
    .trim()
    .notEmpty().withMessage('Motivation statement is required')
    .isLength({ min: 50 }).withMessage('Motivation statement must be at least 50 characters long')
];

exports.applicationStatusValidation = [
  param('id')
    .isInt().withMessage('Invalid application ID'),
  
  body('status')
    .isIn(['pending', 'under_review', 'interview', 'accepted', 'rejected', 'waitlisted']).withMessage('Invalid status'),
  
  body('notes')
    .optional()
    .trim()
];

// Program validation rules
exports.programValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Program name is required')
    .isLength({ max: 100 }).withMessage('Program name cannot exceed 100 characters'),
  
  body('slug')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .isLength({ max: 100 }).withMessage('Slug cannot exceed 100 characters')
    .matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  
  body('duration')
    .trim()
    .notEmpty().withMessage('Duration is required'),
  
  body('type')
    .isIn(['digital_literacy', 'tech_specialization', 'job_placement', 'university_pathway']).withMessage('Invalid program type'),
  
  body('applicationDeadline')
    .isISO8601().withMessage('Invalid application deadline date format'),
  
  body('startDate')
    .optional({ nullable: true })
    .isISO8601().withMessage('Invalid start date format'),
  
  body('endDate')
    .optional({ nullable: true })
    .isISO8601().withMessage('Invalid end date format'),
  
  body('capacity')
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
  
  body('requirements')
    .optional()
    .trim(),
  
  body('outcomes')
    .optional()
    .trim(),
  
  body('image')
    .optional()
    .trim()
    .isURL().withMessage('Image must be a valid URL')
];

// Specialization validation rules
exports.specializationValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Specialization name is required')
    .isLength({ max: 100 }).withMessage('Specialization name cannot exceed 100 characters'),
  
  body('slug')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .isLength({ max: 100 }).withMessage('Slug cannot exceed 100 characters')
    .matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  
  body('icon')
    .optional()
    .trim(),
  
  body('requirements')
    .optional()
    .trim(),
  
  body('outcomes')
    .optional()
    .trim(),
  
  body('programId')
    .optional({ nullable: true })
    .isInt().withMessage('Invalid program ID')
];

// Course validation rules
exports.courseValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Course title is required')
    .isLength({ max: 100 }).withMessage('Course title cannot exceed 100 characters'),
  
  body('code')
    .trim()
    .notEmpty().withMessage('Course code is required')
    .isLength({ max: 20 }).withMessage('Course code cannot exceed 20 characters')
    .matches(/^[A-Z0-9-]+$/).withMessage('Course code can only contain uppercase letters, numbers, and hyphens'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  
  body('duration')
    .isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  
  body('level')
    .isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid course level'),
  
  body('objectives')
    .optional()
    .trim(),
  
  body('prerequisites')
    .optional()
    .trim(),
  
  body('syllabus')
    .optional()
    .trim(),
  
  body('materials')
    .optional()
    .trim(),
  
  body('programId')
    .optional({ nullable: true })
    .isInt().withMessage('Invalid program ID'),
  
  body('image')
    .optional()
    .trim()
    .isURL().withMessage('Image must be a valid URL')
];

// Donation validation rules
exports.donationValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('amount')
    .isFloat({ min: 1 }).withMessage('Amount must be a positive number'),
  
  body('currency')
    .optional()
    .isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code'),
  
  body('frequency')
    .isIn(['one-time', 'monthly', 'annually']).withMessage('Invalid donation frequency'),
  
  body('paymentMethod')
    .isIn(['credit-card', 'paypal', 'bank-transfer']).withMessage('Invalid payment method'),
  
  body('comments')
    .optional()
    .trim(),
  
  body('isAnonymous')
    .optional()
    .isBoolean().withMessage('isAnonymous must be a boolean value'),
  
  body('allocation')
    .optional()
    .isIn(['general', 'scholarships', 'equipment', 'solar', 'other']).withMessage('Invalid allocation')
];

// Volunteer validation rules
exports.volunteerValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 }).withMessage('Please provide a valid phone number'),
  
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required'),
  
  body('volunteerType')
    .isIn(['remote', 'in-person', 'both']).withMessage('Invalid volunteer type'),
  
  body('interests')
    .isArray().withMessage('Interests must be an array')
    .notEmpty().withMessage('At least one interest is required'),
  
  body('skills')
    .isArray().withMessage('Skills must be an array')
    .notEmpty().withMessage('At least one skill is required'),
  
  body('availability')
    .trim()
    .notEmpty().withMessage('Availability is required'),
  
  body('experience')
    .optional()
    .trim(),
  
  body('motivation')
    .trim()
    .notEmpty().withMessage('Motivation statement is required')
    .isLength({ min: 50 }).withMessage('Motivation statement must be at least 50 characters long'),
  
  body('linkedinProfile')
    .optional()
    .trim()
    .isURL().withMessage('LinkedIn profile must be a valid URL')
];

// Student validation rules
exports.studentValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 }).withMessage('Please provide a valid phone number'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601().withMessage('Invalid date of birth format'),
  
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other', 'prefer_not_to_say']).withMessage('Invalid gender'),
  
  body('address')
    .optional()
    .trim(),
  
  body('city')
    .optional()
    .trim(),
  
  body('country')
    .optional()
    .trim(),
  
  body('educationLevel')
    .isIn(['primary', 'secondary', 'diploma', 'bachelors', 'masters', 'other']).withMessage('Invalid education level'),
  
  body('computerExperience')
    .isIn(['none', 'basic', 'intermediate', 'advanced']).withMessage('Invalid computer experience level'),
  
  body('enrollmentDate')
    .isISO8601().withMessage('Invalid enrollment date format'),
  
  body('status')
    .optional()
    .isIn(['active', 'graduated', 'withdrawn', 'on_leave']).withMessage('Invalid student status'),
  
  body('emergencyContactName')
    .optional()
    .trim(),
  
  body('emergencyContactPhone')
    .optional()
    .trim(),
  
  body('emergencyContactRelationship')
    .optional()
    .trim(),
  
  body('notes')
    .optional()
    .trim()
];

// Pagination and filtering validation
exports.paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];