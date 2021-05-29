const express = require('express');
const router = express.Router();
const fileMiddleware = require('../middleware/file');

const {Book} = require('../models');
const bookUpdater = require('../services/BookUpdater')();
const store = {
  books: [],
};

[1, 2, 3].map(el => {
  const newBook = new Book(`book ${el}`, `desc book ${el}`);
  store.books.push(newBook);
});

router.get('/', (req, res) => {
  const {books} = store;
  res.json(books);
});

router.post('/',
  fileMiddleware.single('book-file'),
  (req, res) => {
    const {books} = store;
    const {title, description} = req.body;

    const newBook = new Book(title, description);
    bookUpdater.updateByObject(newBook, req.body);
    if (req.file) {
      const {path} = req.file;
      newBook.fileBook = path;
    }
    books.push(newBook);

    res.status(201);
    res.json(newBook);
  }
);

router.get('/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("book | not found");
  }
});

router.put('/:id',
  fileMiddleware.single('book-file'),
    (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
      bookUpdater.updateByObject(books[idx], req.body);
      if (req.file) {
        const {path} = req.file;
        books[idx].fileBook = path;
      }
      res.json(books[idx]);
    } else {
      res.status(404);
      res.json("book | not found");
    }
  }
);

router.delete('/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json("ok");
  } else {
    res.status(404);
    res.json("book | not found");
  }
});

router.post('/:id/upload-file',
  fileMiddleware.single('book-file'),
  (req, res) => {
    if (!req.file) {
      res.status(400);
      res.json("file not uploaded");
    }
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
      const {path} = req.file;
      books[idx].fileBook = path;
      res.json(books[idx]);
    } else {
      res.status(404);
      res.json("book | not found");
    }
  }
);

module.exports = router;
