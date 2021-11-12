const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbconnect').sequelize;

const Ad = sequelize.define('Ad', {
  productName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  basePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currentPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  duration: {
    type: DataTypes.TIME,
    defaultValue: '00:05:00',
  },
  clock: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: '00:05:00',
  },
  soldAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  catergory: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  auctionStarted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  auctionEnded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  sold: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Ad;
