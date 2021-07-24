import "reflect-metadata";
import { Container } from "inversify";
import { BooksRepository } from "../services/mongo/BooksRepository";
import { BooksRepositoryInterface } from "../services/Interfaces/BooksRepositoryInterface";
import { BooksService } from "../services/BooksService";

const container = new Container();

container.bind(BooksRepositoryInterface).to(BooksRepository);
container.bind(BooksService).toSelf();

export default container;
