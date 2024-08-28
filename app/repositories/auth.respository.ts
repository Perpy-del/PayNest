import { v4 as uuidv4 } from 'uuid';
import db from '../../config/database/db.js';

export const verifyIfUserExists = async (email: string) => {
  const existingUser = await db('users').where({ email: email }).first();

  return existingUser;
};

export const createNewOTP = async (data: {
  otp: string | number;
  email: string;
  expires_at: Date | string;
}) => {
  const otpDetails = await db('otps').insert({
    id: uuidv4(),
    otp: data.otp,
    email: data.email,
    expires_at: data.expires_at,
  });

  return otpDetails;
};

export const verifyTokenValidity = async (email: String) => {
  const verifyToken = await db('otps')
    .where('email', email)
    .andWhere('is_used', false)
    .returning(['otp', 'email', 'expires_at', 'is_used'])
    .then(row => row[0]);

  return verifyToken;
};

export const updateTokenToUsed = async (email: string) => {
  return await db('otps').where('email', email).update({ is_used: true });
};

export const createUser = async (data: {
    username: string;
    email: string;
    otp: string | number;
    firstName: string;
    lastName: string;
    password: string;
}) => {
    const result = await db('users')
    .insert({
      id: uuidv4(),
      username: data.username,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
    })
    .returning('*')
    .then(rows => rows[0]);

    return result;
}
