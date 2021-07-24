import { Container } from "inversify";
import "reflect-metadata";
import { BooksService } from "../books/BooksService";
import { CommentsService } from "../comments/CommentsService";
import { CountersService } from "../services/CountersService";
import { CountersRepository } from "../services/http/CountersRepository";
import { AbstractBooksRepository } from "../books/AbstractBooksRepository";
import { AbstractCommentsRepository } from "../comments/AbstractCommentsRepository";
import { CountersRepositoryInterface } from "../services/Interfaces/CountersRepositoryInterface";
import { UsersRepositoryInterface } from "../services/Interfaces/UsersRepositoryInterface";
import { MongoBooksRepository } from "./MongoBooksRepository";
import { MongoCommentsRepository } from "./MongoCommentsRepository";
import { UsersRepository } from "../services/mongo/UsersRepository";
import { UsersService } from "../services/UsersService";

const container = new Container();

container.bind(AbstractBooksRepository).to(MongoBooksRepository);
container.bind(AbstractCommentsRepository).to(MongoCommentsRepository);
container.bind(UsersRepositoryInterface).to(UsersRepository);
container.bind(CountersRepositoryInterface).to(CountersRepository);

container.bind(BooksService).toSelf();
container.bind(CommentsService).toSelf();
container.bind(UsersService).toSelf();
container.bind(CountersService).toSelf();

export default container;
