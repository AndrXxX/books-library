import { Server, Socket } from "socket.io";
import container from "../infrastructure/container";
import { CommentsService } from "../modules/comments/CommentsService";

const onLoadBookDiscussion = async (socket: Socket, bookId: string) => {
  const commentsService = container.get(CommentsService);
  const comments = await commentsService.getComments(5, { refTypeId: bookId});
  comments && socket.emit('load-book-discussion', comments);
}

const onBookDiscussion = async (socket: Socket) => {
  const {bookId} = socket.handshake.query;
  await onLoadBookDiscussion(socket, bookId as string);

  console.log(`Socket bookId: ${bookId}`);
  socket.join(bookId);
  socket.on('book-discussion', async (msg) => {
    const commentsService = container.get(CommentsService);
    const comment = await commentsService.create(msg);
    if (comment) {
      socket.to(bookId).emit('book-discussion', comment);
      socket.emit('book-discussion', comment);
    }
  });
}

const onDisconnect = (socket: Socket, id: string) => {
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
}

export default (io: Server) => {
  io.on('connection', async (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);

    await onBookDiscussion(socket);
    onDisconnect(socket, id);
  });
};
