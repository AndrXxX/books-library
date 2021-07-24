import { injectable } from "inversify";
import { Document, model } from "mongoose";
import { AbstractBooksRepository } from "../modules/books/AbstractBooksRepository";
import { Book } from '../modules/books/book';
import { bookSchema } from './mongo.schemas/book.schema';

const BookModel = model<Book & Document>('Book', bookSchema);

@injectable()
export class MongoBooksRepository implements AbstractBooksRepository {
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
