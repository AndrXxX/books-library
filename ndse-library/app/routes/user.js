const express = require('express');
const passport = require('passport');
const router = express.Router();
const registerMiddleware = require('../middleware/register');
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

router.get('/register',
  function (req, res) {
    if (req.user) res.redirect('/');
    res.render('user/register', {
      title: "Регистрация",
      user: {},
      error: false,
      info: false,
    })
  },
);

router.post('/register',
  registerMiddleware,
  function (req, res) {
    res.render('user/register', {
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
