export default (store) => {
  return async (req, res, next) => {
    if (!await store.hasBook(req.params.id)) {
      res.status(404);
      return res.json("book | not found");
    }
    return next();
  }
};
