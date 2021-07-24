import express, { Request, Response } from 'express'
import passport from 'passport'
import signupMiddleware, { ResultRequest } from '../../middleware/signup'
import { User } from "../../modules/users/user";

const router = express.Router();

router.post('/login',
  passport.authenticate('local'),
  function (req: Request & Express.Request, res: Response) {
  const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Неверное имя пользователя или пароль"});
    }
    return res.status(201).json({ id: user.id, mail: user.email });
  },
);

router.post('/signup',
  signupMiddleware,
  (req: Request & ResultRequest, res: Response) => {
    return res.status(201).json({
      error: req.error,
      info: req.info,
      success: !req.error,
    });
  },
);

router.get('/logout',
  function (req: Request, res: Response) {
    req.logout()
    return res.status(201).json("ok");
  },
);

export default router;
