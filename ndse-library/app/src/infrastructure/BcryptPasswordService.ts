import bcrypt from 'bcrypt';
import { injectable } from "inversify";

const saltRounds = 10;

@injectable()
export class BcryptPasswordService {
  isValid(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
  generate(password: string): string {
    if (!password) throw new Error("Пароль не может быть пустым");
    return bcrypt.hashSync(password, saltRounds);
  }
}
