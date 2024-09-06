import BadUserRequestError from '../errors/BadUserRequestError.js';
import { createAccount, getAccounts } from '../repositories/account.repository.js';

export const createNewAccount = async (accountData: {
  userId: string;
  balance: number;
  isDefault: boolean;
}) => {
  if (accountData.balance == null || accountData.balance < 0) {
    throw new BadUserRequestError('Invalid balance amount');
  }
  const data = {
    userId: accountData.userId,
    balance: accountData.balance,
    isDefault: accountData.isDefault,
  };
  const result = await createAccount(data);

  return result;
};

export const getAllAccounts = async (
  userId: string,
  balance: number,
  start_date: string,
  end_date: string
) => {
  const accountResults = await getAccounts(userId, balance, start_date, end_date)

  return accountResults;
};
