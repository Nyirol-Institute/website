const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Student = sequelize.define('Student', {
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
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say')
  },
  address: {
    type: DataTypes.TEXT
  },
  city: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: 'South Sudan'
  },
  educationLevel: {
    type: DataTypes.ENUM('primary', 'secondary', 'diploma', 'bachelors', 'masters', 'other')
  },
  computerExperience: {
    type: DataTypes.ENUM('none', 'basic', 'intermediate', 'advanced')
  },
  enrollmentDate: {
    type: DataTypes.DATEONLY
  },
  status: {
    type: DataTypes.ENUM('active', 'graduated', 'withdrawn', 'on_leave'),
    defaultValue: 'active'
  },
  photo: {
    type: DataTypes.STRING
  },
  emergencyContactName: {
    type: DataTypes.STRING
  },
  emergencyContactPhone: {
    type: DataTypes.STRING
  },
  emergencyContactRelationship: {
    type: DataTypes.STRING
  },
  notes: {
    type: DataTypes.TEXT
  }
});

module.exports = Student;