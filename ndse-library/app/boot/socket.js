const onBookDiscussion = (socket) => {
  const {bookId} = socket.handshake.query;
  console.log(`Socket bookId: ${bookId}`);
  socket.join(bookId);
  socket.on('book-discussion', (msg) => {
    msg.type = `bookId: ${bookId}`;
    socket.to(bookId).emit('book-discussion', msg);
    socket.emit('book-discussion', msg);
  });
}

const onDisconnect = (socket, id) => {
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
}

module.exports = function(io) {
  io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);

    onBookDiscussion(socket);
    onDisconnect(socket, id);
  });
};