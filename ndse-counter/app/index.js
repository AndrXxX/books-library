const express = require('express');
const cors = require('cors');
const apiCounterRouter = require('./routes/counter');
const errorMiddleware = require('./middleware/error404');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/counter', apiCounterRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
