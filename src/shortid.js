const charset = 'abcdefghijkmnpqrstuvwxyz-ABCDEFGHJKLMNPQRSTUVWXYZ_23456789';
const clen = charset.length;
const MAX_INT = 2147483647;
const DEFAULT_ID_LENGTH = 5;

function rand() {
  const crypto = window.crypto || window.msCrypto;
  if (crypto) {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return (a[0] & MAX_INT) / MAX_INT;
  } else {
    return Math.random();
  }
}

function randChar() {
  const r = rand() * clen;
  return charset.charAt(r);
}

function getDate() {
  return (new Date()).toISOString();
}

export default function generate(len = DEFAULT_ID_LENGTH) {
  let out = '';
  while (len) {
    out += randChar();
    len -= 1;
  }
  return `${getDate()}-${out}`;
}