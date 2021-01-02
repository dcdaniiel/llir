const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const key = crypto.randomBytes(32);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString('hex'),
    key: key.toString('hex'),
    encryptedData: encrypted.toString('hex'),
  };
}

function decrypt(text) {
  const dec_iv = Buffer.from(text.iv, 'hex');
  const encryptedText = Buffer.from(text.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(text.key),
    dec_iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = { encrypt, decrypt };
