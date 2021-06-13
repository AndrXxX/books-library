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
    TEXT_FIELDS.forEach((name) => {
      book[name] = obj[name] ? obj[name] : "";
    })
    book.favorite = obj.favorite;
  }
}

module.exports = () => new BookUpdater();