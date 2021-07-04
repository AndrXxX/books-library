import { User } from "../models/User";
import passport from 'passport';
import passportLocal, { IStrategyOptions, IVerifyOptions, VerifyFunction } from 'passport-local';
import userStore from '../services/UserStore';
import checker from '../services/HashGenerator';

type doneVerify = (error: any, user?: any, options?: IVerifyOptions) => void;

const verify: VerifyFunction = async (username: string, password: string, done: doneVerify) => {
  await userStore.findByUsername(username, function (err: Error, user: User) {
    if (err) return done(err);
    if (!user || !checker.isValid(password, user.password)) {
      return done(null);
    }
    return done(null, user)
  });
}

const options: IStrategyOptions = {
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: false,
}

export default () => {
  passport.use('local', new passportLocal.Strategy(options, verify))
  passport.serializeUser((user: User | {}, cb) => {
    cb(null, (user as User).id);
  })

  passport.deserializeUser(async (id: string, cb: (err: Error, user?: User) => void) => {
    await userStore.findById(id, (err: Error, user: User) => {
      if (err) return cb(err);
      cb(null, user);
    })
  })

};
