const {Book} = require('../models');

const store = {
  async hasBook(id) {
    return null !== await this.findBook(id);
  },
  async findBook(id) {
    try {
      return await Book.findById(id);
    } catch (e) {
      console.error(e);
      return null
    }
  },
  async deleteBook(id) {
    try {
      await Book.findByIdAndDelete(id);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async updateBook(id, params) {
    try {
      await Book.findByIdAndUpdate(id, params);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async createBook(params) {
    const book = new Book(params);
    try {
      await book.save();
    } catch (e) {
      console.error(e);
    }
    return book;
  },
};

module.exports = store;
