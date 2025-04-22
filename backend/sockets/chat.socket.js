module.exports = (io) => {
    io.of('/chat').on('connection', (socket) => {
      console.log(`User connected to chat: ${socket.user.email}`);
  
      // Join user to their chat room
      socket.join(socket.user._id.toString());
  
      // Handle chat messages
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
        io.of('/chat').to(recipientId).emit('receiveMessage', message);
      });
  
      // Handle disconnect
      socket.on('disconnect', () => {
        console.log(`User disconnected from chat: ${socket.user.email}`);
      });
    });
  };