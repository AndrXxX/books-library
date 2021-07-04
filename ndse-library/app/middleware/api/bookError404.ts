import { NextFunction, Request, Response } from "express";
import { BooksRepository } from '../../services/BooksRepository'

export default (store: BooksRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!await store.hasBook(req.params.id as string)) {
      return res.status(404).json("book | not found");
    }
    return next();
  }
};
