import AuthenticationError from '../errors/AuthenticationError.ts';
import sendEmail from '../utils/sendEmail.ts';
import { hashPassword, compareHashPassword } from '../utils/hashing.ts';
import convertDateFormat from '../utils/convertDateFormat.ts';
import {
  checkIfTokenHasExpired,
  generateRandomToken,
} from '../utils/generateToken.ts';
import {
  changePassword,
  createNewOTP,
  createUser,
  updateTokenToUsed,
  verifyIfUserExists,
  verifyTokenValidity,
} from '../repositories/auth.repository.ts';
import { jwtAuthToken } from '../middlewares/authToken.ts';
import {
  LoginUserValidationType,
  PasswordTokenType,
} from '../interfaces/auth.interface.ts';
import NotFoundError from '../errors/NotFoundError.ts';
import BadUserRequestError from '../errors/BadUserRequestError.ts';

export const verifyUser = async (email: string) => {
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

export const loginUser = async (data: LoginUserValidationType) => {
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

export const getNewPassword = async (user: any, data?: {currentPassword: string; newPassword: string}) => {
  const comparePassword = await compareHashPassword(
    data?.currentPassword as string,
    user.password
  );

  if (!comparePassword) {
    throw new AuthenticationError('Password is incorrect. Please confirm your password');
  }

  const passwordHash = await hashPassword(data?.newPassword as string);

  const passwordData = {
    password: passwordHash,
    email: user.email,
  }

  await changePassword(passwordData);

  return null;
}

export const resetPasswordRequest = async (email: string) => {
  const existingUser = await verifyIfUserExists(email);

  if (!existingUser) {
    throw new NotFoundError('User not found. Please sign up');
  }

  const generateResult = await generateRandomToken();

  const { passwordToken, expiryTime } = generateResult as PasswordTokenType;

  await sendEmail(email, 'Reset Your PayNest Password', 'resetPassword', {
    firstName: existingUser.firstName,
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
}

export const resetPassword = async (resetPasswordData: {otp: string | number; newPassword: string; confirmPassword: string; email: string}) => {
  const checkUserExists = await verifyIfUserExists(resetPasswordData.email);

  if (!checkUserExists) {
    throw new AuthenticationError('User does not exist in our database.');
  }

  const verifyToken = await verifyTokenValidity(resetPasswordData.email);

  if (!verifyToken) {
    throw new AuthenticationError('Invalid verification token.');
  }

  if (checkIfTokenHasExpired(verifyToken.expires_at)) {
    throw new AuthenticationError('Token has expired');
  }

  if (verifyToken.is_used) {
    throw new AuthenticationError('Token has already been used');
  }

  if (resetPasswordData.otp !== verifyToken.otp) {
    throw new AuthenticationError(
      'Invalid Token. Please confirm or request for another token.'
    );
  }

  if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
    throw new BadUserRequestError('Passwords do not match.');
  }

  const passwordHash = await hashPassword(resetPasswordData.newPassword);

  const passwordData = {
    password: passwordHash,
    email: resetPasswordData.email,
  }

  await changePassword(passwordData);

  await updateTokenToUsed(resetPasswordData.email);

  return null;
}
