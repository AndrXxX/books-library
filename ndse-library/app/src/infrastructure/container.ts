import { Container } from "inversify";
import "reflect-metadata";
import { BooksService } from "../books/BooksService";
import { CommentsService } from "../services/CommentsService";
import { CountersService } from "../services/CountersService";
import { CountersRepository } from "../services/http/CountersRepository";
import { AbstractBooksRepository } from "../books/AbstractBooksRepository";
import { CommentsRepositoryInterface } from "../services/Interfaces/CommentsRepositoryInterface";
import { CountersRepositoryInterface } from "../services/Interfaces/CountersRepositoryInterface";
import { UsersRepositoryInterface } from "../services/Interfaces/UsersRepositoryInterface";
import { MongoBooksRepository } from "./MongoBooksRepository";
import { CommentsRepository } from "../services/mongo/CommentsRepository";
import { UsersRepository } from "../services/mongo/UsersRepository";
import { UsersService } from "../services/UsersService";

const container = new Container();

container.bind(AbstractBooksRepository).to(MongoBooksRepository);
container.bind(CommentsRepositoryInterface).to(CommentsRepository);
container.bind(UsersRepositoryInterface).to(UsersRepository);
container.bind(CountersRepositoryInterface).to(CountersRepository);

container.bind(BooksService).toSelf();
container.bind(CommentsService).toSelf();
container.bind(UsersService).toSelf();
container.bind(CountersService).toSelf();

export default container;
