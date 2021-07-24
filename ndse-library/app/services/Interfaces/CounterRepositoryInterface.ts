export abstract class CounterRepositoryInterface {
  abstract get(bookId: string): Promise<number>;
  abstract incr(bookId: string): Promise<number>;
}
