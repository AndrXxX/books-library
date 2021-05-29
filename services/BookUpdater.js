const TEXT_FIELDS = [
  'title',
  'description',
  'authors',
];

class BookUpdater {
  updateByObject(book, obj) {
    if (!book || !obj) {
      return;
    }
    for (const key in TEXT_FIELDS) {
      if (book.hasOwnProperty(key) && obj[key]) {
        book[key] = obj[key];
      }
    }
    book.favorite = obj.favorite;
  }
}

module.exports = () => new BookUpdater();