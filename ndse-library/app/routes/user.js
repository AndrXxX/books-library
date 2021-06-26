const express = require('express');
const passport = require('passport');
const router = express.Router();
const signupMiddleware = require('../middleware/signup');
const authMiddleware = require('../middleware/auth');

router.get('/login',
function (req, res) {
    res.render('user/login', {
      title: "Авторизация",
    })
  },
);

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
  }),
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
      user: req.body.user | {},
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

router.get('/profile',
  authMiddleware,
  function (req, res) {
    res.render('profile', { user: req.user })
  })

module.exports = router;
