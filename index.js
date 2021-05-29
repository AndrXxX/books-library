const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/api/books');
const userRouter = require('./routes/api/user');

const errorMiddleware = require('./middleware/error404');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/api/books', bookRouter);
app.use('/api/user', userRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
