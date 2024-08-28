import bcrypt from 'bcrypt';
import { config } from '../../config/envConfig.js';

async function hashPassword(password: string) {
  const saltRound = Number(config.salt_round);

  try {
    const hash = await bcrypt.hash(password, saltRound);
    return hash;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
