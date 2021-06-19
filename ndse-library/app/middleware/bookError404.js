module.exports = (store) => {
  return async (req, res, next) => {
    if (!await store.hasBook(req.params.id)) {
      return res.status(404).redirect('/404');
    }
    return next();
  }
};