import jwt, { JwtPayload } from 'jsonwebtoken';
import { getUser } from '../repositories/user.repository.js';
import BadUserRequestError from '../errors/BadUserRequestError.js';

export const getUserProfile: any = async (token: string) => {
  const decoded: string | JwtPayload | null | undefined =
    token && jwt.decode(token);

  const { id } = decoded as JwtPayload;

  const existingUserProfile = await getUser(id);

  if (!existingUserProfile) {
    throw new BadUserRequestError('User does not exist on our database');
  }

  const data = {
    user_id: existingUserProfile.user_id,
    email: existingUserProfile.email,
    first_name: existingUserProfile.first_name,
    last_name: existingUserProfile.last_name,
    default_account: {
      account_id: existingUserProfile.account_id,
      balance: existingUserProfile.balance,
    },
  };

  return data;
};
