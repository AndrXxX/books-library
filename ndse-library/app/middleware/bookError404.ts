import container from "../boot/Container";
import { NextFunction, Request, Response } from "express";
import { BooksService } from "../services/book/BooksService";

export default async (req: Request, res: Response, next: NextFunction) => {
  const booksService = container.get(BooksService);
  if (!await booksService.hasBook(req.params.id as string)) {
    return res.status(404).redirect('/404');
  }
  return next();
};
