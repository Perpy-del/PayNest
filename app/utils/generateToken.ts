import { randomInt } from 'node:crypto';
import { add, isAfter } from 'date-fns';
import { PasswordTokenType } from '../interfaces/auth.interface';

export const generateRandomToken = (): Promise<PasswordTokenType> => {
  return new Promise((resolve, reject) => {
    randomInt(10000, 99999, (error, passwordToken) => {
      if (error) {
        console.error(error);
      }
      const now = new Date();
      const expiryTime = add(now, { minutes: 30 });
      try {
        resolve({ passwordToken, expiryTime });
      } catch (error) {
        reject(error);
      }
    });
  });
}

export const checkIfTokenHasExpired = (expiryTime: Date | string): boolean => {
  const now = new Date();

  return isAfter(now, expiryTime);
}