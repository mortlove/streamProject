const { promisify } = require('util');
const scrypt = promisify(require('crypto').scrypt);
const { createCipher } = require('crypto');
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream').promises;
const { ENCRYPTED_SALT } = require('./constants');

(async () => {
  try {
    const [,, fileIn, fileOut, pwd] = process.argv;
    const algorithm = 'aes-192-cbc';
    const key = await scrypt(pwd, ENCRYPTED_SALT, 24);
    await pipeline(
      createReadStream(fileIn),
      createCipher(algorithm, key),
      createWriteStream(fileOut),
    );
  } catch (error) {
    if (filename.code === 'ENOENT') {
      console.error('File is not existing!', error);
    } else {
      console.error(error);
    }
  }
})();
