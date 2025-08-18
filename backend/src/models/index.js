const User = require('./User');
const Program = require('./Program');
const Specialization = require('./Specialization');
const Student = require('./Student');
const Application = require('./Application');
const Donation = require('./Donation');
const Volunteer = require('./Volunteer');
const Course = require('./Course');
const { sequelize } = require('../config/database');

// Program - Specialization relationship
Program.hasMany(Specialization);
Specialization.belongsTo(Program);

// Program - Course relationship
Program.hasMany(Course);
Course.belongsTo(Program);

// Program - Application relationship
Program.hasMany(Application);
Application.belongsTo(Program);

// Specialization - Application relationship
Specialization.hasMany(Application);
Application.belongsTo(Specialization, { as: 'specialization' });

// Application - Student relationship (when an application is accepted)
Application.hasOne(Student);
Student.belongsTo(Application);

// User - Application relationships (for reviewing applications)
User.hasMany(Application, { foreignKey: 'reviewedBy' });
Application.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewedBy' });

User.hasMany(Application, { foreignKey: 'decisionBy' });
Application.belongsTo(User, { as: 'decisionMaker', foreignKey: 'decisionBy' });

// Student - Program enrollment
Student.belongsToMany(Program, { through: 'StudentProgram' });
Program.belongsToMany(Student, { through: 'StudentProgram' });

// Student - Course enrollment
Student.belongsToMany(Course, { through: 'StudentCourse', as: 'courses' });
Course.belongsToMany(Student, { through: 'StudentCourse', as: 'students' });

// User - Volunteer relationships (for reviewing volunteer applications)
User.hasMany(Volunteer, { foreignKey: 'reviewedBy' });
Volunteer.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewedBy' });

module.exports = {
  sequelize,
  User,
  Program,
  Specialization,
  Student,
  Application,
  Donation,
  Volunteer,
  Course
};