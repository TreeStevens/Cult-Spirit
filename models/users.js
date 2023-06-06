//models/users.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class User extends Model {}

User.init({
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  joinDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User', // Update the model name to "User" (capital "U")
});

module.exports = User;
