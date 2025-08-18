const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Volunteer = sequelize.define('Volunteer', {
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
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  volunteerType: {
    type: DataTypes.ENUM('remote', 'in-person', 'both'),
    allowNull: false
  },
  interests: {
    type: DataTypes.JSON,
    allowNull: false
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: false
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experience: {
    type: DataTypes.TEXT
  },
  motivation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cvPath: {
    type: DataTypes.STRING
  },
  linkedinProfile: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('pending', 'under_review', 'interview', 'accepted', 'rejected'),
    defaultValue: 'pending'
  },
  applicationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
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
  assignedProjects: {
    type: DataTypes.JSON
  },
  notes: {
    type: DataTypes.TEXT
  }
});

module.exports = Volunteer;