import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hash = (value) => {
  bcrypt.hash(value, saltRounds, (err, hash) => {
    if (err) throw err;
    return hash;
  });
};

export const compare = (value, hash) => {
  bcrypt.compare(value, hash, (err, result) => {
    if (err) throw err;
    return result;
  });
};