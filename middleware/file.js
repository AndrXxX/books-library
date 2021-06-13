const multer = require('multer');
const MAX_FILE_SIZE = 10*1024*1024;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/books')
  },
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
});

const allowedTypes = [
  'application/pdf',
  'application/msword',
  'text/plain',
  'application/fb2',
];

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(null, false);
  }
  if (file.size > MAX_FILE_SIZE) {
    return cb(null, false);
  }
  return cb(null, true);
};

module.exports = multer({
  storage, fileFilter
});