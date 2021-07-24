import passport from 'passport';
import passportLocal, { IStrategyOptions, IVerifyOptions, VerifyFunction } from 'passport-local';
import container from "../infrastructure/container";
import { User } from "../models/User";
import checker from '../services/HashGenerator';
import { UsersService } from "../services/UsersService";

type doneVerify = (error: any, user?: any, options?: IVerifyOptions) => void;

const verify: VerifyFunction = async (username: string, password: string, done: doneVerify) => {
  const usersService = container.get(UsersService)
  const user = await usersService.getUser({ username });
  if (!user || !checker.isValid(password, user.password)) {
    return done(new Error('Неверное имя или пароль'));
  }
  return done(null, user);
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
    const usersService = container.get(UsersService)
    const user = await usersService.getUser({ id });
    cb(null, user);
  })

};
