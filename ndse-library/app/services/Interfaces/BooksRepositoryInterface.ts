import { Book } from "../../models/Book";

export abstract class BooksRepositoryInterface {
  abstract getBooks(): Promise<Book[]>;
  abstract hasBook(id: string): Promise<boolean>;
  abstract getBook(id: string): Promise<Book | null>;
  abstract deleteBook(id: string): Promise<boolean>;
  abstract updateBook(id: string, params: Book): Promise<boolean>;
  abstract createBook(params: Book): Promise<Book>;
}
