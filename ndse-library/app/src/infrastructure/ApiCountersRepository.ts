import { injectable } from "inversify";
import { AbstractCountersRepository } from "../counters/AbstractCountersRepository";

const axios = require('axios');
const PROTOCOL = 'http';
const getUrl = (serviceUrl: string, bookId: string): string => `${PROTOCOL}://${serviceUrl}/counter/${bookId}`;
const incrUrl = (serviceUrl: string, bookId: string): string => `${getUrl(serviceUrl, bookId)}/incr`;
const serviceUrl = process.env.COUNTER_URL;

async function getResult(url: string, method: string): Promise<number> {
  try {
    const result = await axios[method](url)
    return result.data as number;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

@injectable()
export class ApiCountersRepository implements AbstractCountersRepository {
  url: string;
  constructor() {
    this.url = serviceUrl;
  }
  async get(bookId: string): Promise<number> {
    return await getResult(getUrl(this.url, bookId), 'get');
  }
  async incr(bookId: string): Promise<number> {
    return await getResult(incrUrl(this.url, bookId), 'post');
  }
}
