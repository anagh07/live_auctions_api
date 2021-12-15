const express = require('express');
require('dotenv').config();
const connectDb = require('./db/dbconnect');
const { createServer } = require('http');
const socketio = require('./socket');

const app = express();
const server = createServer(app);
const io = socketio.init(server);

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
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/ad', require('./routes/ad'));
app.use('/bid', require('./routes/bid'));
app.use('/room', require('./routes/room'));
app.use('/auction', require('./routes/auction'));

// Connect DB and Initialize server
connectDb();
const PORT = process.env.PORT || 5000;
io.on('connection', (socket) => {
  console.log('### Socket IO client connected');
});
server.listen(PORT, () => {
  console.log(`### Server running on port ${PORT}`);
});
