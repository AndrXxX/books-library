const express = require('express');
const passport = require('passport')
const expressSession = require('express-session')
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./boot/auth');
const bootSocket = require('./boot/socket');
const socketIO = require('socket.io');

const booksRouter = require('./routes/books');
const userRouter = require('./routes/user');
const apiBooksRouter = require('./routes/api/books');
const apiUserRouter = require('./routes/api/user');
const indexRouter = require('./routes/index');

const loggerMiddleware = require('./middleware/logger');
const authMiddleware = require('./middleware/auth');
const errorMiddleware = require('./middleware/error404');

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
  return;
}

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
bootSocket(socketIO(server));
