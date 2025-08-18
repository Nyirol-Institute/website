const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Donation = sequelize.define('Donation', {
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
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD'
  },
  frequency: {
    type: DataTypes.ENUM('one-time', 'monthly', 'annually'),
    defaultValue: 'one-time'
  },
  paymentMethod: {
    type: DataTypes.ENUM('credit-card', 'paypal', 'bank-transfer'),
    allowNull: false
  },
  transactionId: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  donationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  comments: {
    type: DataTypes.TEXT
  },
  isAnonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  receiptSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  receiptDate: {
    type: DataTypes.DATE
  },
  allocation: {
    type: DataTypes.ENUM('general', 'scholarships', 'equipment', 'solar', 'other'),
    defaultValue: 'general'
  },
  subscriptionId: {
    type: DataTypes.STRING
  },
  nextBillingDate: {
    type: DataTypes.DATE
  }
});

module.exports = Donation;