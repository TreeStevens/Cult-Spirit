const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

module.exports = sequelize;
