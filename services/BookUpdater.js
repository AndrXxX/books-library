class BookUpdater {
  updateByObject(book, obj) {
    for (const key in book) {
      if (key === "id") {
        continue;
      }
      if (book.hasOwnProperty(key) && obj.hasOwnProperty(key)) {
        book[key] = obj[key];
      }
    }
  }
}

module.exports = () => new BookUpdater();