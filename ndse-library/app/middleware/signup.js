const userStore = require('../services/UserStore');

module.exports = async function (req, res, next) {
  await userStore.findByUsername(req.body.user.username, async function (err, user) {
    if (user) {
      req.error = `Пользователь с логином ${user.username} уже зарегистрирован`;
      console.log(`Пользователь с логином ${user.username} уже зарегистрирован`, user);
      return next();
    }
    await userStore.create(req.body.user, function (err, user) {
      if (err) {
        req.error = err.message;
      }
      req.info = "Пользователь зарегистрирован";
      req.user = user;
      return next();
    });
  });
}