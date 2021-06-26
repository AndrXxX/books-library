const express = require('express');
const router = express.Router();
const passport = require('passport');
const registerMiddleware = require('../../middleware/register');

router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    if (!req.user) {
      return res.status(401).json({ error: "Неверное имя пользователя или пароль"});
    }
    return res.status(201).json({ id: req.user.id, mail: req.user.email });
  },
);

router.post('/signup',
  registerMiddleware,
  function (req, res) {
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

module.exports = router;
