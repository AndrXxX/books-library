import express, { Request, Response } from 'express'
import path from 'path'
import container from "../../infrastructure/container";
import bookExistMiddleware from '../../middleware/api/bookError404'
import authMiddleware from '../../middleware/auth'
import fileMiddleware from '../../middleware/file'
import { Book } from "../../modules/books/book";
import { BooksService } from "../../modules/books/BooksService";

const router = express.Router();

router.get('/',
  authMiddleware,
  async (req, res) => {
    res.json(await container.get(BooksService).getBooks());
  }
);

router.post('/',
  authMiddleware,
  fileMiddleware.single('book-file'),
  async (req: Request, res: Response) => {
    const booksService = container.get(BooksService);
    const {title, description, authors, favorite, file} = req.body;
    const newBook = await booksService.createBook({
      title, description, authors, favorite,
      fileName: file ? file.path : "",
    });
    res.status(201).json(newBook);
  }
);

router.get('/:id',
  authMiddleware,
  bookExistMiddleware,
  async (req, res) => {
    const booksService = container.get(BooksService);
    res.json(await booksService.getBook(req.params.id))
  }
);

router.put('/:id',
  authMiddleware,
  bookExistMiddleware,
  fileMiddleware.single('book-file'),
  async (req: Request & Express.Request, res) => {
    const booksService = container.get(BooksService);
    const { title, description, authors, favorite } = req.body;
    const book = await booksService.updateBook(req.params.id, {
      title, description, authors, favorite,
      fileName: req.file ? req.file.path : "",
    });
    res.json(book);
  }
);

router.delete('/:id',
  authMiddleware,
  bookExistMiddleware,
  async (req, res) => {
    const booksService = container.get(BooksService);
    await booksService.deleteBook(req.params.id);
    return res.json("ok");
  }
);

router.post('/:id/upload-file',
  authMiddleware,
  bookExistMiddleware,
  fileMiddleware.single('book-file'),
  async (req: Request & Express.Request, res) => {
    if (!req.file) {
      return res.status(400).json("file | not uploaded");
    }
    const booksService = container.get(BooksService);
    const book = await booksService.updateBook(req.params.id, {
      fileName: req.file.path,
    } as Book);
    res.json(book);
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
    res.download(book.fileName, `book${path.parse(book.fileName).ext}`, err => {
      err && res.status(404).json();
    });
  }
);

export default router;
