//models/associations.js

const Points = require('./Points');
const { Transactions } = require('./transactions');
const User = require('./users');

User.hasMany(Points, {
  foreignKey: 'userID',
  as: 'pointsRecords',
  onDelete: 'CASCADE', // optional: deletes child records when deleting a user
});

Points.belongsTo(User, {
  foreignKey: 'userID',
  as: 'userPoints',
});

Transactions.belongsTo(User, { foreignKey: 'userID', as: 'userTransactions' });

module.exports = { User, Points, Transactions };
