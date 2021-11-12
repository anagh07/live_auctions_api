const User = require('../models/User');
const Ad = require('../models/Ad');
const sequelize = require('./dbconnect').sequelize;

const dbsync = async () => {
  // Seller - ad
  User.hasMany(Ad, {
    foreignKey: {
      name: 'seller',
    },
  });
  Ad.belongsTo(User, {
    foreignKey: {
      name: 'seller',
    },
  });
  // Current bidder - ad
  Ad.belongsTo(User, {
    foreignKey: {
      name: 'currentBidder',
    },
  });
  // Ad sold to User
  Ad.belongsTo(User, {
    foreignKey: {
      name: 'soldTo',
    },
  });

  (async () => {
    try {
      console.log('### Syncing');
      await sequelize.sync();
    } catch (error) {
      return console.log(error);
    }
  })();
};

module.exports = dbsync;
