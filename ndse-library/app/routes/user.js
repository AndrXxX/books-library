const express = require('express');
const passport = require('passport');
const router = express.Router();
const signupMiddleware = require('../middleware/signup');
const authMiddleware = require('../middleware/auth');

router.get('/login',
function (req, res) {
    res.render('user/login', {
      title: "Авторизация",
      user: {},
      error: false,
    });
  },
);

router.post('/login',
  (req, res, next) => {
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
  function (req, res) {
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
  function (req, res) {
    res.render('user/signup', {
      title: "Регистрация",
      user: req.body.user || {},
      error: req.error,
      info: req.info,
    });
  },

);

router.get('/logout',
  function (req, res) {
    req.logout()
    res.redirect('/')
  },
);

router.get('/me',
  authMiddleware,
  function (req, res) {
    res.render('user/profile', { title: "Профиль", user: req.user })
  })

module.exports = router;
