const fs = require('fs');
const path = require('path');

const DIR = '../counters';
const EXT = '.json';

const checkAccess = (file) => {
  try {
    fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
}

const createFile = (file) => {
  if (checkAccess(file)) {
    return true;
  }
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, '0');
    return true;
  } catch (e) {
    return false;
  }
}

const getPath = (bookId) => {
  return path.join(__dirname, DIR, bookId + EXT);
}

class CountersAccessor {
  constructor(path) {
    this.path = path;
  }
  read() {
    const data = fs.readFileSync(this.path, 'utf8');
    return data ? parseInt(data) : 0;
  }
  incr() {
    let current = this.read();
    fs.writeFileSync(this.path, String(++current));
    return current;
  }
}

const getAccessor = (bookId) => {
  const path = getPath(bookId);
  if (!createFile(path)) {
    console.error(`Не удалось получить доступ к файлу ${path}`);
    process.exit(-1);
  }
  return new CountersAccessor(path);
}

module.exports = {
  getAccessor: bookId => getAccessor(bookId),
};
