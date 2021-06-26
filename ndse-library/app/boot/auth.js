const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userStore = require('../services/UserStore');
const checker = require('../services/HashGenerator');

/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
 */
async function verify(username, password, done) {
  await userStore.findByUsername(username, function (err, user) {
    if (err) return done(err);
    if (!user || !checker.isValid(password, user.password)) {
      return done(null, false);
    }
    return done(null, user)
  });
}

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
}

module.exports = function() {
  passport.use('local', new LocalStrategy(options, verify))
  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  })

  passport.deserializeUser(async function (id, cb) {
    await userStore.findById(id, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    })
  })

};