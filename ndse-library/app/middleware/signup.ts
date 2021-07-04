import { Request } from "express";
import userStore from '../services/UsersRepository';

export default async function (req: Request & { error: string, info: string }, res: Response, next: any) {
  let user = await userStore.getUser({ username: req.body.user.username });
  if (user) {
    req.error = `Пользователь с логином ${user.username} уже зарегистрирован`;
    return next();
  }
  user = await userStore.createUser(req.body.user);
  req.info = "Пользователь зарегистрирован";
  req.user = user;
  return next();
}
