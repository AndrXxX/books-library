const uidGenerator = require('node-unique-id-generator');

class Book {
  constructor(title = "", desc = "") {
    this.id = uidGenerator.generateUniqueId();
    this.title = title;
    this.description = desc;
    this.authors = "";
    this.favorite = "";
    this.fileCover = "";
    this.fileName = "";
    this.fileBook = "";
  }
}

module.exports = Book;
