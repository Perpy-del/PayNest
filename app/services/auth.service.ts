import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthenticationError from '../errors/AuthenticationError.js';
import sendEmail from '../utils/sendEmail.js';
import { hashPassword, compareHashPassword } from '../utils/hashing.js';
import convertDateFormat from '../utils/convertDateFormat.js';
import {
  checkIfTokenHasExpired,
  generateRandomToken,
} from '../utils/generateToken.js';
import {
  changePassword,
  createNewOTP,
  createUser,
  updateTokenToUsed,
  verifyIfUserExists,
  verifyTokenValidity,
} from '../repositories/auth.respository.js';
import { jwtAuthToken } from '../middlewares/authToken.js';
import {
  LoginUserValidationType,
  PasswordTokenType,
} from '../interfaces/auth.interface.js';

export const verifyUserService = async (email: string) => {
  const checkUserExists = await verifyIfUserExists(email);

  if (checkUserExists) {
    throw new AuthenticationError('User already exists. Please log in');
  }

  const generateResult = await generateRandomToken();

  const { passwordToken, expiryTime } = generateResult as PasswordTokenType;

  await sendEmail(email, 'Verify your PayNest Account', 'verifyMessage', {
    token: passwordToken,
    date: convertDateFormat(new Date().toString()),
  });

  const otpData = {
    otp: passwordToken,
    email: email,
    expires_at: expiryTime,
  };

  await createNewOTP(otpData);

  return null;
};

export const createNewUser = async (userData: {
  email: string;
  otp?: string | number;
  password: any;
  username: string;
  firstName: string;
  lastName: string;
}): Promise<any> => {
  const checkUserExists = await verifyIfUserExists(userData.email);

  if (checkUserExists) {
    throw new AuthenticationError('User already exists. Please log in');
  }

  const verifyToken = await verifyTokenValidity(userData.email);

  if (!verifyToken) {
    throw new AuthenticationError('Invalid verification token.');
  }

  if (checkIfTokenHasExpired(verifyToken.expires_at)) {
    throw new AuthenticationError('Token has expired');
  }

  if (verifyToken.is_used) {
    throw new AuthenticationError('Token has already been used');
  }

  if (userData.otp !== verifyToken.otp) {
    throw new AuthenticationError(
      'Invalid Token. Please confirm or request for another token.'
    );
  }

  const passwordHash = await hashPassword(userData.password);

  const userResult = {
    username: userData.username,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: passwordHash,
  };

  const newUser = await createUser(userResult as any);

  const payload = {
    email: newUser.email,
    id: newUser.id,
  };

  const token = jwtAuthToken(payload);

  const result = {
    username: newUser.username,
    email: newUser.email,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    status: newUser.status,
    jwt: token,
  };

  await updateTokenToUsed(newUser.email);

  await sendEmail(
    newUser.email,
    'PayNest Account Verified Successfully',
    'welcomeMessage',
    {
      firstName: userData.firstName,
      date: convertDateFormat(newUser.created_at as string),
    }
  );

  return result;
};

export const loginUserService = async (data: LoginUserValidationType) => {
  const checkUserExists = await verifyIfUserExists(data.email);

  if (!checkUserExists) {
    throw new AuthenticationError('User credentials do not match our records.');
  }

  const comparePassword = await compareHashPassword(
    data.password,
    checkUserExists.password
  );

  if (!comparePassword) {
    throw new AuthenticationError('User credentials do not match our records.');
  }

  const token = jwtAuthToken(checkUserExists);

  const userData: { jwt: string } = {
    jwt: token,
  };

  return userData;
};

export const changePasswordService = async (token?: string, data?: {currentPassword: string; newPassword: string}) => {
  const decoded: string | JwtPayload | null | undefined = token && jwt.decode(token);

  const { email } = decoded as JwtPayload;

  const existingUser = await verifyIfUserExists(email);

  if (!existingUser) {
    throw new AuthenticationError('User has not been authorized to change their password');
  }

  const comparePassword = await compareHashPassword(
    data?.currentPassword as string,
    existingUser.password
  );

  if (!comparePassword) {
    throw new AuthenticationError('Password is incorrect. Please confirm your password');
  }

  const passwordHash = await hashPassword(data?.newPassword as string);

  const passwordData = {
    password: passwordHash,
    email: email,
  }

  await changePassword(passwordData);

  return null;
}
