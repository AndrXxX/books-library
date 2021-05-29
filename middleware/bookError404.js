module.exports = (store) => {
  return (req, res, next) => {
    if (!store.hasBook(req.params.id)) {
      return res.status(404).redirect('/404');
    }
    return next();
  }
};