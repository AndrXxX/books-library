import { injectable } from "inversify";
import { BooksRepositoryInterface } from "../services/Interfaces/BooksRepositoryInterface";

@injectable()
export class BooksService {
  constructor(private readonly repo: BooksRepositoryInterface) {}

  getBooks(): Promise<any[]> {
    return this.repo.getBooks();
  }
  hasBook(id: string): Promise<boolean> {
    return this.repo.hasBook(id);
  }
  getBook(id: string): Promise<any | null> {
    return this.repo.getBook(id);
  }
  deleteBook(id: string): Promise<boolean> {
    return this.repo.deleteBook(id);
  }
  updateBook(id: string, params: any): Promise<boolean> {
    return this.repo.updateBook(id, params);
  }
  createBook(params: any): Promise<any> {
    return this.repo.createBook(params);
  }
}
