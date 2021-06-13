const {Book} = require('../models');

const store = {
  books: [],
  getIdx(id) {
    return this.books.findIndex(el => el.id === id);
  },
  hasBook(id) {
    return this.getIdx(id) !== -1;
  },
  findBook(id) {
    return this.hasBook(id) ? this.books[this.getIdx(id)] : null;
  },
  deleteBook(id) {
    if (!this.hasBook(id)) {
      return false;
    }
    this.books.splice(this.getIdx(id), 1);
    return true;
  },
};

[1, 2, 3].map(el => {
  const newBook = new Book(`book ${el}`, `desc book ${el}`);
  store.books.push(newBook);
});

module.exports = store;
