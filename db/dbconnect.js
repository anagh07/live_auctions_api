const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
  }
);

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('#### Database connected successfully...');
  } catch (error) {
    console.log('Unable to connect to db', error);
  }
};

module.exports.connetDb = connectDb;
module.exports.sequelize = sequelize;
