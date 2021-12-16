const { Server } = require('socket.io');
let io;
let adIo;

exports.init = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_BASE_URL,
      methods: ['*'],
      allowedHeaders: ['*'],
    },
  });
  return io;
};

exports.initAdIo = (server, path = '/socket/adpage') => {
  adIo = new Server(server, {
    cors: {
      origin: process.env.CLIENT_BASE_URL,
      methods: ['*'],
      allowedHeaders: ['*'],
    },
    path: path,
  });
  return adIo;
};

exports.getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

exports.getAdIo = () => {
  if (!adIo) {
    throw new Error('Socket.io not initialized');
  }
  return adIo;
};
