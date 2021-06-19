const express = require('express');
const accessorFactory = require('../Utils/CountersAccessor');
const router = express.Router();

router.get('/:bookId',
  (req, res) => {
    const bookId = req.params.bookId;
    const accessor = accessorFactory.getAccessor(bookId);
    res.json(accessor.read());
  }
);

router.post('/:bookId/incr',
  (req, res) => {
    const bookId = req.params.bookId;
    const accessor = accessorFactory.getAccessor(bookId);
    res.json(accessor.incr());
});

module.exports = router;