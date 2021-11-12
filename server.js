const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db/dbconnect');
const dbsync = require('./db/dbsync');

// Body parser
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Default route
app.get('/', (req, res, next) => {
  res.send('Server running');
});

// Routes
// app.use('/auth', require('./routes/auth'));

// Connect DB and Initialize server
const PORT = process.env.PORT;
(async function () {
  await db.connetDb();
  await dbsync();
  app.listen(PORT, () => {
    console.log(`#### Server running on port ${PORT}...`);
  });
})();
