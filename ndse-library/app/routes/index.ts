import express from 'express'
import authMiddleware from '../middleware/auth'
const router = express.Router();

router.get('/',
  authMiddleware,
  (req, res) => {
    res.render("index", {
      title: "Главная",
    });
  }
);

export default router;
