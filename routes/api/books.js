const express = require('express');
const router = express.Router();
const fileMiddleware = require('../../middleware/file');
const bookExistMiddleware = require('../../middleware/bookError404');
const path = require('path');

const {Book} = require('../../models');
const bookUpdater = require('../../services/BookUpdater')();
const store = require('../../services/Store');

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

router.get('/:id',
  bookExistMiddleware(store),
  (req, res) => res.json(store.findBook(req.params.id))
);

router.put('/:id',
  bookExistMiddleware(store),
  fileMiddleware.single('book-file'),
  (req, res) => {
    const book = store.findBook(req.params.id);
    bookUpdater.updateByObject(book, req.body);
    req.file && (book.fileBook = req.file.path);
    res.json(book);
  }
);

router.delete('/:id',
  bookExistMiddleware(store),
  (req, res) => {
    store.deleteBook(req.params.id);
    return res.json("ok");
  }
);

router.post('/:id/upload-file',
  bookExistMiddleware(store),
  fileMiddleware.single('book-file'),
  (req, res) => {
    if (!req.file) {
      res.status(400);
      res.json("file | not uploaded");
    }
    const book = store.findBook(req.params.id);
    book.fileBook = req.file.path;
    return res.json(book);
  }
);

router.get('/:id/download-file',
  bookExistMiddleware(store),
  (req, res) => {
    const book = store.findBook(req.params.id);
    if (!book.fileBook) {
      res.status(404);
      return res.json("book file | not found");
    }
    res.download(book.fileBook, `book${path.parse(book.fileBook).ext}`, err=>{
      if (err){
        res.status(404).json();
      }
    });
  }
);

module.exports = router;
