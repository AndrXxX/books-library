import express from 'express';
import passport from 'passport';
import expressSession from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import auth from './boot/auth';
import bootSocket from './boot/socket';
import { Server } from "socket.io";

import booksRouter from './routes/books';
import userRouter from './routes/user';
import apiBooksRouter from './routes/api/books';
import apiUserRouter from './routes/api/user';
import indexRouter from './routes/index';

import loggerMiddleware from './middleware/logger';
import authMiddleware from './middleware/auth';
import errorMiddleware from './middleware/error404';

const app = express();
auth();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(expressSession({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cors());
app.set("view engine", "ejs");
app.use(loggerMiddleware);
app.use('/public', express.static(__dirname+"/public"));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/user', userRouter);
app.use('/api/books', apiBooksRouter);
app.use('/api/user', apiUserRouter);

app.use(authMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/mydb';

try {
  mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (e) {
  console.log(e);
}

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
bootSocket(new Server(server));
