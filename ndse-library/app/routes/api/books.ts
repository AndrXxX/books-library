import express, { Request, Response } from 'express'
import { Book } from "../../models/Book";
import fileMiddleware from '../../middleware/file'
import bookExistMiddleware from '../../middleware/api/bookError404'
import authMiddleware from '../../middleware/auth'
import path from 'path'
import { booksRepository } from '../../services/BooksRepository'
const router = express.Router();

router.get('/',
  authMiddleware,
  async (req, res) => {
    res.json(await booksRepository.getBooks());
  }
);

router.post('/',
  authMiddleware,
  fileMiddleware.single('book-file'),
  async (req: Request, res: Response) => {
    const {title, description, authors, favorite, file} = req.body;
    const newBook = await booksRepository.createBook({
      title, description, authors, favorite,
      fileName: file ? file.path : "",
    });
    res.status(201).json(newBook);
  }
);

router.get('/:id',
  authMiddleware,
  bookExistMiddleware(booksRepository),
  async (req, res) => {
    res.json(await booksRepository.getBook(req.params.id))
  }
);

router.put('/:id',
  authMiddleware,
  bookExistMiddleware(booksRepository),
  fileMiddleware.single('book-file'),
  async (req: Request & Express.Request, res) => {
    const { title, description, authors, favorite } = req.body;
    const book = await booksRepository.updateBook(req.params.id, {
      title, description, authors, favorite,
      fileName: req.file ? req.file.path : "",
    });
    res.json(book);
  }
);

router.delete('/:id',
  authMiddleware,
  bookExistMiddleware(booksRepository),
  async (req, res) => {
    await booksRepository.deleteBook(req.params.id);
    return res.json("ok");
  }
);

router.post('/:id/upload-file',
  authMiddleware,
  bookExistMiddleware(booksRepository),
  fileMiddleware.single('book-file'),
  async (req: Request & Express.Request, res) => {
    if (!req.file) {
      return res.status(400).json("file | not uploaded");
    }
    const book = await booksRepository.updateBook(req.params.id, {
      fileName: req.file.path,
    } as Book);
    res.json(book);
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
    res.download(book.fileName, `book${path.parse(book.fileName).ext}`, err => {
      err && res.status(404).json();
    });
  }
);

export default router;
