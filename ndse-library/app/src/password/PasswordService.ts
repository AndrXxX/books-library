export abstract class PasswordService {
  abstract isValid(password: string, hash: string): boolean;
  abstract generate(password: string): string;
}
