//root/models/Transactions.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const path = require('path');
const User = require(path.join(__dirname, 'users'));

const Transactions = sequelize.define('Transactions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'bonus',
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'createdAt',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updatedAt',
  },
});

Transactions.belongsTo(User, { foreignKey: 'userID' });

module.exports = {
  Transactions, // Add the Transactions model to the exports
};