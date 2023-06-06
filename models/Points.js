//models/Points.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./users');

class Points extends Model {}

Points.init({
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
  totalPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  availablePoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  monthlyPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
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
}, {
  sequelize,
  modelName: 'Points', // Update the model name to "Points" (capital "P")
});

Points.belongsTo(User, { foreignKey: 'userID' });

module.exports = Points;
