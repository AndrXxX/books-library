import { injectable } from "inversify";
import { AbstractCountersRepository } from "./AbstractCountersRepository";

@injectable()
export class CountersService {
  constructor(private readonly repo: AbstractCountersRepository) {}

  get(bookId: string): Promise<number> {
    return this.repo.get(bookId);
  }
  incr(bookId: string): Promise<number> {
    return this.repo.incr(bookId);
  }
}
