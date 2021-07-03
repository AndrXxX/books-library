import express, { Request } from 'express'
import passport from 'passport'
import { User } from "../../models/User";
import signupMiddleware from '../../middleware/signup'
const router = express.Router();

router.post('/login',
  passport.authenticate('local'),
  function (req: Request & { user: User }, res) {
    if (!req.user) {
      return res.status(401).json({ error: "Неверное имя пользователя или пароль"});
    }
    return res.status(201).json({ id: req.user.id, mail: req.user.email });
  },
);

router.post('/signup',
  signupMiddleware,
  function (req: Request & { error: string, info: string }, res) {
    return res.status(201).json({
      error: req.error,
      info: req.info,
      success: !req.error,
    });
  },
);

router.get('/logout',
  function (req, res) {
    req.logout()
    return res.status(201).json("ok");
  },
);

export default router;
