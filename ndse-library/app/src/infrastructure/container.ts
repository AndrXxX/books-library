import { Container } from "inversify";
import "reflect-metadata";
import { BcryptPasswordService } from "./BcryptPasswordService";
import { PasswordService } from "../modules/password/PasswordService";
import { BooksService } from "../modules/books/BooksService";
import { CommentsService } from "../modules/comments/CommentsService";
import { CountersService } from "../modules/counters/CountersService";
import { ApiCountersRepository } from "./ApiCountersRepository";
import { AbstractBooksRepository } from "../modules/books/AbstractBooksRepository";
import { AbstractCommentsRepository } from "../modules/comments/AbstractCommentsRepository";
import { AbstractCountersRepository } from "../modules/counters/AbstractCountersRepository";
import { AbstractUsersRepository } from "../modules/users/AbstractUsersRepository";
import { MongoBooksRepository } from "./MongoBooksRepository";
import { MongoCommentsRepository } from "./MongoCommentsRepository";
import { MongoUsersRepository } from "./MongoUsersRepository";
import { UsersService } from "../modules/users/UsersService";

const container = new Container();

container.bind(AbstractBooksRepository).to(MongoBooksRepository);
container.bind(AbstractCommentsRepository).to(MongoCommentsRepository);
container.bind(AbstractUsersRepository).to(MongoUsersRepository);
container.bind(AbstractCountersRepository).to(ApiCountersRepository);
container.bind(PasswordService).to(BcryptPasswordService);

container.bind(BooksService).toSelf();
container.bind(CommentsService).toSelf();
container.bind(UsersService).toSelf();
container.bind(CountersService).toSelf();

export default container;
