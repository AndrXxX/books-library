import { injectable } from "inversify";
import { BooksRepositoryInterface } from "./book/BooksRepositoryInterface";
import { BookModel, Book } from '../models/Book';

@injectable()
export class BooksRepository implements BooksRepositoryInterface {
  async getBooks(): Promise<Book[]> {
    try {
      return await BookModel.find().select('-__v');
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  async hasBook(id: string): Promise<boolean> {
    return null !== await this.getBook(id);
  }
  async getBook(id: string): Promise<Book | null> {
    try {
      return await BookModel.findById(id).select('-__v');
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  async deleteBook(id: string): Promise<boolean> {
    try {
      await BookModel.findByIdAndDelete(id);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  async updateBook(id: string, params: Book): Promise<boolean> {
    try {
      await BookModel.findByIdAndUpdate(id, params).select('-__v');
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  async createBook(book: Book): Promise<Book> {
    const bookModel = new BookModel(book);
    try {
      await bookModel.save();
    } catch (e) {
      console.error(e);
    }
    return bookModel;
  }
}

export const booksRepository = new BooksRepository();
