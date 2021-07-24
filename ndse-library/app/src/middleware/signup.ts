import { NextFunction, Request, Response } from "express";
import container from "../infrastructure/container";
import { UsersService } from "../modules/users/UsersService";

export interface ResultRequest {
  error?: string,
  info?: string,
}

export default async function (req: Request & ResultRequest, res: Response, next: NextFunction) {
  const usersService = container.get(UsersService)
  let user = await usersService.getUser({ username: req.body.user.username });
  if (user) {
    req.error = `Пользователь с логином ${user.username} уже зарегистрирован`;
    return next();
  }
  user = await usersService.createUser(req.body.user);
  req.info = "Пользователь зарегистрирован";
  req.user = user;
  return next();
}
