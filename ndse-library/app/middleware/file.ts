import { Request } from "express";
import multer from 'multer';
const MAX_FILE_SIZE = 10*1024*1024;

const storage = multer.diskStorage({
  destination(req: Request, file, cb: (err: Error, destination: string) => void) {
    if (file.fieldname === "fileBook") {
      cb(null, 'public/books');
    } else {
      cb(null, 'public/images');
    }
  },
  filename(req: Request, file, cb: (err: Error, destination: string) => void) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
});

const allowedTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/fb2',
  'application/vnd.oasis.opendocument.text',
  'image/jpeg',
  'image/png',
];

const fileFilter = (req: Request, file: Express.Multer.File, cb: (err: Error, passed: boolean) => void) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(null, false);
  }
  if (file.size > MAX_FILE_SIZE) {
    return cb(null, false);
  }
  return cb(null, true);
};

export default multer({
  storage, fileFilter
});
