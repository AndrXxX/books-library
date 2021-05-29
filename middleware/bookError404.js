module.exports = (store) => {
  return (req, res, next) => {
    if (!store.hasBook(req.params.id)) {
      res.status(404);
      return res.json("book | not found");
    }
    return next();
  }
};