const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  educationLevel: {
    type: DataTypes.ENUM('primary', 'secondary', 'diploma', 'bachelors', 'masters', 'other'),
    allowNull: false
  },
  computerExperience: {
    type: DataTypes.ENUM('none', 'basic', 'intermediate', 'advanced'),
    allowNull: false
  },
  motivationStatement: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  questions: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('pending', 'under_review', 'interview', 'accepted', 'rejected', 'waitlisted'),
    defaultValue: 'pending'
  },
  applicationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  reviewDate: {
    type: DataTypes.DATE
  },
  reviewNotes: {
    type: DataTypes.TEXT
  },
  reviewedBy: {
    type: DataTypes.INTEGER
  },
  interviewDate: {
    type: DataTypes.DATE
  },
  interviewNotes: {
    type: DataTypes.TEXT
  },
  decisionDate: {
    type: DataTypes.DATE
  },
  decisionNotes: {
    type: DataTypes.TEXT
  },
  decisionBy: {
    type: DataTypes.INTEGER
  }
});

module.exports = Application;