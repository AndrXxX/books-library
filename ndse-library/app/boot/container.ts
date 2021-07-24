import { Container } from "inversify";
import "reflect-metadata";
import { BooksService } from "../services/BooksService";
import { CommentsService } from "../services/CommentsService";
import { CountersService } from "../services/CountersService";
import { CountersRepository } from "../services/http/CountersRepository";
import { BooksRepositoryInterface } from "../services/Interfaces/BooksRepositoryInterface";
import { CommentsRepositoryInterface } from "../services/Interfaces/CommentsRepositoryInterface";
import { CountersRepositoryInterface } from "../services/Interfaces/CountersRepositoryInterface";
import { UsersRepositoryInterface } from "../services/Interfaces/UsersRepositoryInterface";
import { BooksRepository } from "../services/mongo/BooksRepository";
import { CommentsRepository } from "../services/mongo/CommentsRepository";
import { UsersRepository } from "../services/mongo/UsersRepository";
import { UsersService } from "../services/UsersService";

const container = new Container();

container.bind(BooksRepositoryInterface).to(BooksRepository);
container.bind(CommentsRepositoryInterface).to(CommentsRepository);
container.bind(UsersRepositoryInterface).to(UsersRepository);
container.bind(CountersRepositoryInterface).to(CountersRepository);

container.bind(BooksService).toSelf();
container.bind(CommentsService).toSelf();
container.bind(UsersService).toSelf();
container.bind(CountersService).toSelf();

export default container;
