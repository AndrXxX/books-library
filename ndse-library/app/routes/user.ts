import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import authMiddleware from '../middleware/auth'
import signupMiddleware, { ResultRequest } from '../middleware/signup'
const router = express.Router();

router.get('/login',
function (req: Request, res: Response) {
    res.render('user/login', {
      title: "Авторизация",
      user: {},
      error: false,
    });
  },
);

router.post('/login',
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', function (err, user) {
      if (err || !user) {
        return res.render('user/login', {
          title: "Авторизация",
          user: req.body,
          error: "Неверное имя пользователя или пароль",
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  },
);

router.get('/signup',
  function (req: Request, res: Response) {
    if (req.user) res.redirect('/');
    res.render('user/signup', {
      title: "Регистрация",
      user: {},
      error: false,
      info: false,
    })
  },
);

router.post('/signup',
  signupMiddleware,
  (req: Request & ResultRequest, res: Response) => {
    res.render('user/signup', {
      title: "Регистрация",
      user: req.body.user || {},
      error: req.error,
      info: req.info,
    });
  },

);

router.get('/logout',
  function (req: Request, res: Response) {
    req.logout()
    res.redirect('/')
  },
);

router.get('/me',
  authMiddleware,
  function (req: Request, res: Response) {
    res.render('user/profile', { title: "Профиль", user: req.user })
  })

export default router;
