const PointsTotal = require('./models/pointsTotal.js');
const sequelize = require('./database.js');

sequelize
  .sync
  .then(() => {
    console.log('All models synchronized with database');
    process.exit();
  })
  .catch((err) => {
    console.error('Error synchronizing models with database:', err);
    process.exit(1);
  });
