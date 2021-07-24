export abstract class CountersRepositoryInterface {
  abstract get(bookId: string): Promise<number>;
  abstract incr(bookId: string): Promise<number>;
}
