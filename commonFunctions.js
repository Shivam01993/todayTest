const bcrypt = require('bcryptjs');
const encryptString = (str) => {
  return bcrypt.hashSync(str, 8);
}


module.exports = {
  encryptString: encryptString
}