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
  try {
    const result = await bcrypt.compare(password, passwordHash);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  hashPassword,
  compareHashPassword,
};
