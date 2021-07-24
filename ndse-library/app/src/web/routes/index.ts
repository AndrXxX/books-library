import express, { Request, Response } from 'express'
import authMiddleware from '../middleware/auth'

const router = express.Router();

router.get('/',
  authMiddleware,
  (req: Request, res: Response) => {
    res.render("index", {
      title: "Главная",
    });
  }
);

export default router;
