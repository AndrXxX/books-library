import express, { Request, Response } from 'express'
import { Book } from "../models/Book";
import { User } from "../models/User";
import fileMiddleware from '../middleware/file'
import bookExistMiddleware from '../middleware/bookError404'
import authMiddleware from '../middleware/auth'
import countersFactory from '../Utils/CountersAccessor'
import path from 'path'
import { booksRepository } from '../services/BooksRepository'
const counter = countersFactory.getAccessor(process.env.COUNTER_URL);
const router = express.Router();

router.get('/',
  authMiddleware,
  async (req: Request, res: Response) => {
    res.render("books/index", {
      title: "Книги",
      books: await booksRepository.getBooks(),
    });
  },
);

router.post('/create',
  authMiddleware,
  fileMiddleware.fields([
    {name: 'fileBook', maxCount: 1},
    {name: 'fileCover', maxCount: 1}
  ]),
  async (req: Request & Express.Request, res) => {
    const {title, description, authors, favorite} = req.body;
    const params: Book = { title, description, authors, favorite };
    const files = req.files as { [propertyName: string]: Express.Multer.File[] };
    files.fileBook && (params.fileName = files.fileBook[0].path);
    files.fileCover && (params.fileCover = files.fileCover[0].path);
    await booksRepository.createBook(params);
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
  bookExistMiddleware(booksRepository),
  async (req, res) => {
    res.render("books/update", {
      title: "Книги | редактирование",
      book: await booksRepository.getBook(req.params.id),
    });
  }
);

router.post('/:id/update',
  authMiddleware,
  bookExistMiddleware(booksRepository),
  fileMiddleware.fields([
    {name: 'fileBook', maxCount: 1},
    {name: 'fileCover', maxCount: 1}
  ]),
  async (req: Request & Express.Request, res) => {
    const {title, description, authors, favorite} = req.body;
    const params: Book = { title, description, authors, favorite };
    const files = req.files as { [propertyName: string]: Express.Multer.File[] };
    files.fileBook && (params.fileName = files.fileBook[0].path);
    files.fileCover && (params.fileCover = files.fileCover[0].path);
    await booksRepository.updateBook(req.params.id, params as Book);
    res.redirect(`/books/${req.params.id}`);
});

router.post('/:id/delete',
  authMiddleware,
  bookExistMiddleware(booksRepository),
  async (req, res) => {
    await booksRepository.deleteBook(req.params.id);
    res.redirect(`/books`);
  }
);

router.get('/:id/download-file',
  authMiddleware,
  bookExistMiddleware(booksRepository),
  async (req, res) => {
    const book = await booksRepository.getBook(req.params.id);
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
  bookExistMiddleware(booksRepository),
  async (req, res) => {
    const book = await booksRepository.getBook(req.params.id);
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
  bookExistMiddleware(booksRepository),
  async (req: Request & Express.Request, res: Response) => {
    await counter.incr(req.params.id);
    res.render("books/view", {
      title: "Книги | информация",
      book: await booksRepository.getBook(req.params.id),
      count: await counter.get(req.params.id),
      username: (req.user as User).username,
    });
  }
);

export default router;
