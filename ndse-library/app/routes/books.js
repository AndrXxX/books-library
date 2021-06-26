const express = require('express');
const router = express.Router();
const fileMiddleware = require('../middleware/file');
const bookExistMiddleware = require('../middleware/bookError404');
const countersFactory = require('../Utils/CountersAccessor');
const path = require('path');
const counter = countersFactory.getAccessor(process.env.COUNTER_URL);
const store = require('../services/Store');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
  res.render("books/index", {
    title: "Книги",
    books: await store.findAll(),
  });
});

router.post('/create',
  authMiddleware,
  fileMiddleware.single('book-file'),
  async (req, res) => {
    const {title, description, authors, favorite} = req.body;
    await store.createBook({
      title, description, authors, favorite,
      fileBook: req.file ? req.file.path : "",
    });
    res.redirect('/books')
  }
);

router.get('/create',
  authMiddleware,
  (req, res) => {
    res.render("books/create", {
      title: "Книги | создание",
      book: {},
    });
  }
);

router.get('/:id/update',
  authMiddleware,
  bookExistMiddleware(store),
  async (req, res) => {
    res.render("books/update", {
      title: "Книги | редактирование",
      book: await store.findBook(req.params.id),
    });
  }
);

router.post('/:id/update',
  authMiddleware,
  bookExistMiddleware(store),
  async (req, res) => {
    const {title, description, authors, favorite} = req.body;
    await store.updateBook(req.params.id, {
      title, description, authors, favorite,
      fileBook: req.file ? req.file.path : "",
    });
    res.redirect(`/books/${req.params.id}`);
});

router.post('/:id/delete',
  authMiddleware,
  bookExistMiddleware(store),
  async (req, res) => {
    await store.deleteBook(req.params.id);
    res.redirect(`/books`);
  }
);

router.get('/:id/download-file',
  authMiddleware,
  bookExistMiddleware(store),
  async (req, res) => {
    const book = await store.findBook(req.params.id);
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
  authMiddleware,
  bookExistMiddleware(store),
  async (req, res) => {
    await counter.incr(req.params.id);
    res.render("books/view", {
      title: "Книги | информация",
      book: await store.findBook(req.params.id),
      count: await counter.get(req.params.id),
    });
  }
);

module.exports = router;