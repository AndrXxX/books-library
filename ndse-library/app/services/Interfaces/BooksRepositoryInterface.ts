export abstract class BooksRepositoryInterface {
  abstract getBooks(): Promise<any[]>;
  abstract hasBook(id: string): Promise<boolean>;
  abstract getBook(id: string): Promise<any | null>;
  abstract deleteBook(id: string): Promise<boolean>;
  abstract updateBook(id: string, params: any): Promise<boolean>;
  abstract createBook(params: any): Promise<any>;
}
