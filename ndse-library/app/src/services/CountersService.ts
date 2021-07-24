import { injectable } from "inversify";
import { CountersRepositoryInterface } from "../services/Interfaces/CountersRepositoryInterface";

@injectable()
export class CountersService {
  constructor(private readonly repo: CountersRepositoryInterface) {}

  get(bookId: string): Promise<number> {
    return this.repo.get(bookId);
  }
  incr(bookId: string): Promise<number> {
    return this.repo.incr(bookId);
  }
}
