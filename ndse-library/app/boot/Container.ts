import "reflect-metadata";
import { Container } from "inversify";
import { BooksRepository } from "../services/BooksRepository";
import { BooksRepositoryInterface } from "../services/book/BooksRepositoryInterface";
import { BooksService } from "../services/book/BooksService";

const container = new Container();

container.bind(BooksRepositoryInterface).to(BooksRepository);
container.bind(BooksService).toSelf();

export default container;
