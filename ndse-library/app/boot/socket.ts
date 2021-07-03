import commentStore from '../services/CommentStore';

const onLoadBookDiscussion = (socket, bookId) => {
  commentStore.find(5, { refTypeId: bookId }, (err, comments) => {
    comments && socket.emit('load-book-discussion', comments);
  })
}

const onBookDiscussion = (socket) => {
  const {bookId} = socket.handshake.query;
  onLoadBookDiscussion(socket, bookId);

  console.log(`Socket bookId: ${bookId}`);
  socket.join(bookId);
  socket.on('book-discussion', (msg) => {
    commentStore.create(msg, (err, comment) => {
      socket.to(bookId).emit('book-discussion', comment);
      socket.emit('book-discussion', comment);
    });
  });
}

const onDisconnect = (socket, id) => {
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
}

export default (io) => {
  io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);

    onBookDiscussion(socket);
    onDisconnect(socket, id);
  });
};
