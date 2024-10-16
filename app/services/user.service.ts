import { getUser } from '../repositories/user.repository';
import BadUserRequestError from '../errors/BadUserRequestError';

export const getUserProfile: any = async (id: string) => {
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
