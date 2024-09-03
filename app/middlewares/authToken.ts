import { addSeconds, getTime } from 'date-fns';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../interfaces/auth.interface';
import env from '../../config/env.js';
dotenv.config();

export const jwtAuthToken = (details: TokenPayload) => {
  const expiryDate = addSeconds(new Date(), Number(env.jwt_expiration));

  const payload = {
    exp: Math.floor(getTime(expiryDate) / 1000),
    email: details.email,
    id: details.id,
  };

  const token = jwt.sign(payload, env.jwt_access as string, {
    issuer: env.jwt_issuer,
  });

  return token;
};
