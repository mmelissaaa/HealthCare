const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

module.exports = (io) => {
  io.use((socket, next) => {
    // Authenticate socket connection using JWT
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error: Invalid token'));
      }

      // Attach user to socket
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }

      socket.user = user;
      next();
    });
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.email}`);

    // Join user to their room
    socket.join(socket.user._id.toString());

    // Handle real-time chat
    socket.on('sendMessage', async (data) => {
      const { recipientId, content } = data;

      // Save message to database
      const message = new Message({
        sender: socket.user._id,
        recipient: recipientId,
        content,
        status: 'sent'
      });

      await message.save();

      // Emit message to recipient
      io.to(recipientId).emit('receiveMessage', message);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.email}`);
    });
  });
};