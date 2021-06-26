const bcrypt = require('bcrypt');
const saltRounds = 10;

const generator = {
  isValid(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
  generate(password) {
    if (!password) throw new Error("Пароль не может быть пустым");
    return bcrypt.hashSync(password, saltRounds);
  }
};

module.exports = generator;
