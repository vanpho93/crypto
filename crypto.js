var crypto = require('crypto-js');
// var e = crypto.AES.encrypt("khoapham", "vfyewec3@#$#ejf3903494^@%");
// var d = crypto.AES.decrypt(e.toString(), "vfyewec3@#$#ejf3903494^@%");
// console.log(e.toString());
// console.log(d.toString(crypto.enc.Utf8));

function encrypt(msg){
  return crypto.AES.encrypt(msg, "vfyewec3@#$#ejf3903494^@%").toString();
}

function decrypt(en){
  return crypto.AES.decrypt(en, "vfyewec3@#$#ejf3903494^@%").toString(crypto.enc.Utf8);
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}
