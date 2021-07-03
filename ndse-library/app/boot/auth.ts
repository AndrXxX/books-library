import passport from 'passport';
import passportLocal from 'passport-local';
import userStore from '../services/UserStore';
import checker from '../services/HashGenerator';

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

export default () => {
  passport.use('local', new passportLocal.Strategy(options, verify))
  passport.serializeUser(function (user: { id: string }, cb) {
    cb(null, user.id);
  })

  passport.deserializeUser(async function (id, cb) {
    await userStore.findById(id, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    })
  })

};
