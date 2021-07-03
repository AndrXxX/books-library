import express, { Request } from 'express'
import fileMiddleware from '../middleware/file'
import bookExistMiddleware from '../middleware/bookError404'
import authMiddleware from '../middleware/auth'
import countersFactory from '../Utils/CountersAccessor'
import path from 'path'
import store from '../services/Store'
const counter = countersFactory.getAccessor(process.env.COUNTER_URL);
const router = express.Router();

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
  async (req: Request & { files: any }, res) => {
    const {title, description, authors, favorite} = req.body;
    const params: { [propertyName: string]: string } = {title, description, authors, favorite};
    req.files.fileBook && (params.fileName = req.files.fileBook[0].path);
    req.files.fileCover && (params.fileCover = req.files.fileCover[0].path);
    await store.createBook(params);
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
  async (req: Request & { files: any }, res) => {
    const {title, description, authors, favorite} = req.body;
    const params: { [propertyName: string]: string } = {title, description, authors, favorite};
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
    if (!book.fileName) {
      return res.status(404).json("book file | not found");
    }
    res.download(book.fileName, `${book.authors}-${book.title}${path.parse(book.fileName).ext}`, err => {
      if (err) res.status(404).json();
    });
  }
);

router.get('/:id/download-cover',
  authMiddleware,
  bookExistMiddleware(store),
  async (req, res) => {
    const book = await store.findBook(req.params.id);
    if (!book.fileCover) {
      return res.status(404).json("book file | not found");
    }
    res.download(book.fileCover, `${book.authors}-${book.title}-cover${path.parse(book.fileCover).ext}`, err => {
      if (err) res.status(404);
    });
  }
);

router.get('/:id',
  authMiddleware,
  bookExistMiddleware(store),
  async (req: Request & { user: any }, res) => {
    await counter.incr(req.params.id);
    res.render("books/view", {
      title: "Книги | информация",
      book: await store.findBook(req.params.id),
      count: await counter.get(req.params.id),
      username: req.user.username,
    });
  }
);

export default router;
