const express = require('express');
const router = express.Router();
const fileMiddleware = require('../middleware/file');

const {Book} = require('../models');
const bookUpdater = require('../services/BookUpdater')();
const store = {
  books: [],
  getIdx(id) {
    return this.books.findIndex(el => el.id === id);
  },
  hasBook(id) {
    return this.getIdx(id) !== -1;
  },
  findBook(id) {
    return this.hasBook(id) ? this.books[this.getIdx(id)] : null;
  },
  deleteBook(id) {
    if (!this.hasBook(id)) {
      return false;
    }
    this.books.splice(this.getIdx(id), 1);
    return true;
  },
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
  const book = store.findBook(req.params.id);
  if (!book) {
    res.status(404);
    return res.json("book | not found");
  }
  return res.json(book);
});

router.put('/:id',
  fileMiddleware.single('book-file'),
    (req, res) => {
    const book = store.findBook(req.params.id);
    if (!book) {
      res.status(404);
      return res.json("book | not found");
    }
    bookUpdater.updateByObject(book, req.body);
    req.file && (book.fileBook = req.file.path);
    res.json(book);
  }
);

router.delete('/:id', (req, res) => {
  if (!store.hasBook(req.params.id)) {
    res.status(404);
    return res.json("book | not found");
  }
  store.deleteBook(req.params.id);
  return res.json("ok");
});

router.post('/:id/upload-file',
  fileMiddleware.single('book-file'),
  (req, res) => {
    if (!req.file) {
      res.status(400);
      res.json("file | not uploaded");
    }
    const book = store.findBook(req.params.id);
    if (!book) {
      res.status(404);
      return res.json("book | not found");
    }
    book.fileBook = req.file.path;
    return res.json(book);
  }
);

module.exports = router;
