import express, { Request } from 'express'
import fileMiddleware from '../../middleware/file'
import bookExistMiddleware from '../../middleware/api/bookError404'
import authMiddleware from '../../middleware/auth'
import path from 'path'
import store from '../../services/Store'
const router = express.Router();

router.get('/',
  async (req, res) => {
    res.json(await store.findAll());
  }
);

router.post('/',
  authMiddleware,
  fileMiddleware.single('book-file'),
  async (req: Request & { file: any }, res) => {
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
  async (req: Request & { file: any }, res) => {
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
  async (req: Request & { file: any }, res) => {
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
    if (!book.fileName) {
      return res.status(404).json("book file | not found");
    }
    res.download(book.fileName, `book${path.parse(book.fileName).ext}`, err => {
      err && res.status(404).json();
    });
  }
);

export default router;
