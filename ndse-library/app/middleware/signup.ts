import { NextFunction, Request, Response } from "express";
import { usersRepository } from '../services/mongo/UsersRepository';

export interface ResultRequest {
  error?: string,
  info?: string,
}

export default async function (req: Request & ResultRequest, res: Response, next: NextFunction) {
  let user = await usersRepository.getUser({ username: req.body.user.username });
  if (user) {
    req.error = `Пользователь с логином ${user.username} уже зарегистрирован`;
    return next();
  }
  user = await usersRepository.createUser(req.body.user);
  req.info = "Пользователь зарегистрирован";
  req.user = user;
  return next();
}
