const User = require('../models/User');
const Ad = require('../models/Ad');
const sequelize = require('./dbconnect').sequelize;

const dbsync = async () => {
  // Patient.hasMany(SelfAssessment);
  // SelfAssessment.belongsTo(Patient);

  // Create table if not already created
  (async () => {
    try {
      console.log('### Syncing');
      await sequelize.sync();
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server error');
    }
  })();
};

module.exports = dbsync;
