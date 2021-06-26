const passport = require('passport')
// const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy
const userStore = require('../services/UserStore');

/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
 */
async function verify(username, password, done) {
  await userStore.findByUsername(username, function (err, user) {
    if (err) return done(err);
    if (!user || !userStore.verifyPassword(user, password)) {
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
    // TODO use crypto
  // Configure the local strategy for use by Passport.
  //
  // The local strategy requires a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  // passport.use(new Strategy(function(username, password, cb) {
  //   db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [ username ], function(err, row) {
  //     if (err) { return cb(err); }
  //     if (!row) { return cb(null, false); }
  //
  //     crypto.pbkdf2(password, row.salt, 10000, 32, 'sha256', function(err, hashedPassword) {
  //       if (err) { return cb(err); }
  //       if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
  //         return cb(null, false);
  //       }
  //
  //       var user = {
  //         id: row.id.toString(),
  //         username: row.username,
  //         displayName: row.name
  //       };
  //       return cb(null, user);
  //     });
  //   });
  // }));

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