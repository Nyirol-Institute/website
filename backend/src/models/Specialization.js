const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Specialization = sequelize.define('Specialization', {
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
  icon: {
    type: DataTypes.STRING
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
  }
});

module.exports = Specialization;