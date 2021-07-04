import { Comment } from "../models/Comment";
import { Server, Socket } from "socket.io";
import commentStore from '../services/CommentStore';

const onLoadBookDiscussion = (socket: Socket, bookId: string) => {
  commentStore.find(5, { refTypeId: bookId }, (err: Error, comments: Comment[]) => {
    comments && socket.emit('load-book-discussion', comments);
  })
}

const onBookDiscussion = (socket: Socket) => {
  const {bookId} = socket.handshake.query;
  onLoadBookDiscussion(socket, bookId as string);

  console.log(`Socket bookId: ${bookId}`);
  socket.join(bookId);
  socket.on('book-discussion', (msg) => {
    commentStore.create(msg, (err, comment) => {
      comment && socket.to(bookId).emit('book-discussion', comment);
      comment && socket.emit('book-discussion', comment);
    });
  });
}

const onDisconnect = (socket: Socket, id: string) => {
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
}

export default (io: Server) => {
  io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);

    onBookDiscussion(socket);
    onDisconnect(socket, id);
  });
};
