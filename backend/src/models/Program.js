const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Program = sequelize.define('Program', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('digital_literacy', 'tech_specialization', 'job_placement', 'university_pathway'),
    allowNull: false
  },
  applicationDeadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  },
  capacity: {
    type: DataTypes.INTEGER
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  requirements: {
    type: DataTypes.TEXT
  },
  outcomes: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  }
});

module.exports = Program;