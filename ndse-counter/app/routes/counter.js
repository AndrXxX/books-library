const express = require('express');
const router = express.Router();

router.get('/:bookId',
  (req, res) => {
    const bookId = req.params.bookId;
    // TODO
    res.json(bookId);
  }
);

router.post('/:bookId/incr',
  (req, res) => {
    const bookId = req.params.bookId;
    // TODO
    res.json(bookId);
});

module.exports = router;