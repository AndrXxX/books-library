class BookUpdater {
  updateByObject(book, obj) {
    if (!book || !obj) {
      return false;
    }

    for (const key in book) {
      if (key === "id") {
        continue;
      }
      if (book.hasOwnProperty(key) && obj[key]) {
        book[key] = obj[key];
      }
    }
  }
}

module.exports = () => new BookUpdater();