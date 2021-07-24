export abstract class AbstractCountersRepository {
  abstract get(bookId: string): Promise<number>;
  abstract incr(bookId: string): Promise<number>;
}
