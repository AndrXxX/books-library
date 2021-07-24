import express, { Request, Response } from 'express'
import path from 'path'
import container from "../infrastructure/container";
import authMiddleware from '../middleware/auth'
import bookExistMiddleware from '../middleware/bookError404'
import fileMiddleware from '../middleware/file'
import { Book } from "../modules/books/book";
import { User } from "../users/user";
import { BooksService } from "../modules/books/BooksService";
import { CountersService } from "../counters/CountersService";

const router = express.Router();

router.get('/',
  authMiddleware,
  async (req: Request, res: Response) => {
    const booksService = container.get(BooksService);
    res.render("books/index", {
      title: "Книги",
      books: await booksService.getBooks(),
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
    const booksService = container.get(BooksService);
    const {title, description, authors, favorite} = req.body;
    const params: Book = { title, description, authors, favorite };
    const files = req.files as { [propertyName: string]: Express.Multer.File[] };
    files.fileBook && (params.fileName = files.fileBook[0].path);
    files.fileCover && (params.fileCover = files.fileCover[0].path);
    await booksService.createBook(params);
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
  bookExistMiddleware,
  async (req, res) => {
    const booksService = container.get(BooksService);
    res.render("books/update", {
      title: "Книги | редактирование",
      book: await booksService.getBook(req.params.id),
    });
  }
);

router.post('/:id/update',
  authMiddleware,
  bookExistMiddleware,
  fileMiddleware.fields([
    {name: 'fileBook', maxCount: 1},
    {name: 'fileCover', maxCount: 1}
  ]),
  async (req: Request & Express.Request, res) => {
    const booksService = container.get(BooksService);
    const {title, description, authors, favorite} = req.body;
    const params: Book = { title, description, authors, favorite };
    const files = req.files as { [propertyName: string]: Express.Multer.File[] };
    files.fileBook && (params.fileName = files.fileBook[0].path);
    files.fileCover && (params.fileCover = files.fileCover[0].path);
    await booksService.updateBook(req.params.id, params as Book);
    res.redirect(`/books/${req.params.id}`);
});

router.post('/:id/delete',
  authMiddleware,
  bookExistMiddleware,
  async (req, res) => {
    const booksService = container.get(BooksService);
    await booksService.deleteBook(req.params.id);
    res.redirect(`/books`);
  }
);

router.get('/:id/download-file',
  authMiddleware,
  bookExistMiddleware,
  async (req, res) => {
    const booksService = container.get(BooksService);
    const book = await booksService.getBook(req.params.id);
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
  bookExistMiddleware,
  async (req, res) => {
    const booksService = container.get(BooksService);
    const book = await booksService.getBook(req.params.id);
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
  bookExistMiddleware,
  async (req: Request & Express.Request, res: Response) => {
    const booksService = container.get(BooksService);
    const countersService = container.get(CountersService);
    await countersService.incr(req.params.id);
    res.render("books/view", {
      title: "Книги | информация",
      book: await booksService.getBook(req.params.id),
      count: await countersService.get(req.params.id),
      username: (req.user as User).username,
    });
  }
);

export default router;
