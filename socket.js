const { Server } = require('socket.io');
let io;

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

exports.getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
