import bcrypt from 'bcrypt';
import env from '../../config/env.js';

async function hashPassword(password: string) {
  const saltRound = Number(env.salt_round);

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

export { hashPassword, compareHashPassword };
