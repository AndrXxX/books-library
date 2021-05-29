const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/books');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/api/books', bookRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
