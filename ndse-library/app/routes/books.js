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
  fileMiddleware.fields([
    {name: 'fileBook', maxCount: 1},
    {name: 'fileCover', maxCount: 1}
  ]),
  async (req, res) => {
    const {title, description, authors, favorite} = req.body;
    const params = {title, description, authors, favorite};
    req.files.fileBook && (params.fileName = req.files.fileBook[0].path);
    req.files.fileCover && (params.fileCover = req.files.fileCover[0].path);
    await store.createBook(req.params.id, params);
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
  fileMiddleware.fields([
    {name: 'fileBook', maxCount: 1},
    {name: 'fileCover', maxCount: 1}
  ]),
  async (req, res) => {
    const {title, description, authors, favorite} = req.body;
    const params = {title, description, authors, favorite};
    req.files.fileBook && (params.fileName = req.files.fileBook[0].path);
    req.files.fileCover && (params.fileCover = req.files.fileCover[0].path);
    await store.updateBook(req.params.id, params);
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