import "reflect-metadata";
import { Container } from "inversify";
import { CommentsService } from "../services/CommentsService";
import { CommentsRepositoryInterface } from "../services/Interfaces/CommentsRepositoryInterface";
import { CommentsRepository } from "../services/mongo/CommentsRepository";
import { BooksRepository } from "../services/mongo/BooksRepository";
import { BooksRepositoryInterface } from "../services/Interfaces/BooksRepositoryInterface";
import { BooksService } from "../services/BooksService";

const container = new Container();

container.bind(BooksRepositoryInterface).to(BooksRepository);
container.bind(CommentsRepositoryInterface).to(CommentsRepository);

container.bind(BooksService).toSelf();
container.bind(CommentsService).toSelf();

export default container;
