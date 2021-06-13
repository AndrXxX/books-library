const axios = require('axios');
const PROTOCOL = 'http';
const getUrl = (serviceUrl, bookId) => `${PROTOCOL}://${serviceUrl}/counter/${bookId}`;
const incrUrl = (serviceUrl, bookId) => `${getUrl(serviceUrl, bookId)}/incr`;

async function getResult(url, method) {
  try {
    const result = await axios[method](url)
    return result.data;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

class CountersAccessor {
  constructor(serviceUrl) {
    this.url = serviceUrl;
  }
  async get(bookId) {
    return await getResult(getUrl(this.url, bookId), 'get');
  }
  async incr(bookId) {
    return await getResult(incrUrl(this.url, bookId), 'post');
  }
}

module.exports = {
  getAccessor: serviceUrl => new CountersAccessor(serviceUrl),
};
