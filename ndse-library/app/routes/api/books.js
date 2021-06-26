const express = require('express');
const router = express.Router();
const fileMiddleware = require('../../middleware/file');
const bookExistMiddleware = require('../../middleware/api/bookError404');
const authMiddleware = require('../../middleware/auth');
const path = require('path');
const store = require('../../services/Store');

router.get('/',
  async (req, res) => {
    res.json(await store.findAll());
  }
);

router.post('/',
  authMiddleware,
  fileMiddleware.single('book-file'),
  async (req, res) => {
    const {title, description, authors, favorite} = req.body;
    const newBook = await store.createBook({
      title, description, authors, favorite,
      fileBook: req.file ? req.file.path : "",
    });
    res.status(201).json(newBook);
  }
);

router.get('/:id',
  authMiddleware,
  bookExistMiddleware(store),
  async (req, res) => {
    res.json(await store.findBook(req.params.id))
  }
);

router.put('/:id',
  authMiddleware,
  bookExistMiddleware(store),
  fileMiddleware.single('book-file'),
  async (req, res) => {
    const {title, description, authors, favorite} = req.body;
    const book = await store.updateBook(req.params.id, {
      title, description, authors, favorite,
      fileBook: req.file ? req.file.path : "",
    });
    res.json(book);
  }
);

router.delete('/:id',
  authMiddleware,
  bookExistMiddleware(store),
  async (req, res) => {
    await store.deleteBook(req.params.id);
    return res.json("ok");
  }
);

router.post('/:id/upload-file',
  authMiddleware,
  bookExistMiddleware(store),
  fileMiddleware.single('book-file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json("file | not uploaded");
    }
    const book = await store.updateBook(req.params.id, {
      fileBook: req.file.path,
    });
    res.json(book);
  }
);

router.get('/:id/download-file',
  authMiddleware,
  bookExistMiddleware(store),
  async (req, res) => {
    const book = await store.findBook(req.params.id);
    if (!book.fileBook) {
      return res.status(404).json("book file | not found");
    }
    res.download(book.fileBook, `book${path.parse(book.fileBook).ext}`, err => {
      err && res.status(404).json();
    });
  }
);

module.exports = router;
