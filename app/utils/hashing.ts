import bcrypt from 'bcrypt';
import { config } from '../../config/envConfig.js';

async function hashPassword(password: string) {
  const saltRound = Number(config.salt_round);

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRound, function (error, hash) {
      if (error) {
        console.error(error);
      }
      try {
        resolve(hash);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
}

async function compareHashPassword(password: string, passwordHash: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, function (error, result) {
      if (error) {
        console.error(error);
      }
      try {
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
}

export {
  hashPassword,
  compareHashPassword,
};
