import { injectable } from "inversify";
import { AbstractBooksRepository } from "./AbstractBooksRepository";
import { Book } from "./book";

@injectable()
export class BooksService {
  constructor(private readonly repo: AbstractBooksRepository) {}

  getBooks(): Promise<Book[]> {
    return this.repo.getBooks();
  }
  hasBook(id: string): Promise<boolean> {
    return this.repo.hasBook(id);
  }
  getBook(id: string): Promise<Book | null> {
    return this.repo.getBook(id);
  }
  deleteBook(id: string): Promise<boolean> {
    return this.repo.deleteBook(id);
  }
  updateBook(id: string, params: Book): Promise<boolean> {
    return this.repo.updateBook(id, params);
  }
  createBook(params: Book): Promise<Book> {
    return this.repo.createBook(params);
  }
}
