const express = require('express');
const router = express.Router();
const fileMiddleware = require('../middleware/file');
const bookExistMiddleware = require('../middleware/bookError404');
const countersFactory = require('../Utils/CountersAccessor');
const path = require('path');
const counter = countersFactory.getAccessor(process.env.COUNTER_URL);

console.log(process.env.COUNTER_URL);

const {Book} = require('../models');
const bookUpdater = require('../services/BookUpdater')();
const store = require('../services/Store');

router.get('/', (req, res) => {
  res.render("books/index", {
    title: "Книги",
    books: store.books,
  });
});

router.post('/create',
  fileMiddleware.single('book-file'),
  (req, res) => {
    const newBook = new Book();
    bookUpdater.updateByObject(newBook, req.body);
    req.file && (newBook.fileBook = req.file.path);
    store.books.push(newBook);
    res.redirect('/books')
  }
);

router.get('/create', (req, res) => {
  res.render("books/create", {
    title: "Книги | создание",
    book: {},
  });
});

router.get('/:id/update',
  bookExistMiddleware(store),
  (req, res) => {
    res.render("books/update", {
      title: "Книги | редактирование",
      book: store.findBook(req.params.id),
    });
  }
);

router.post('/:id/update',
  bookExistMiddleware(store),
  (req, res) => {
    const book = store.findBook(req.params.id);
    bookUpdater.updateByObject(book, req.body);
    req.file && (book.fileBook = req.file.path);
    res.redirect(`/books/${req.params.id}`);
});

router.post('/:id/delete',
  bookExistMiddleware(store),
  (req, res) => {
    store.deleteBook(req.params.id);
    res.redirect(`/books`);
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

router.get('/:id',
  bookExistMiddleware(store),
  async (req, res) => {
    await counter.incr(req.params.id);
    res.render("books/view", {
      title: "Книги | информация",
      book: store.findBook(req.params.id),
      count: await counter.get(req.params.id),
    });
  }
);

module.exports = router;