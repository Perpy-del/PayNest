import BadUserRequestError from '../errors/BadUserRequestError.js';
import { createAccount, getAccounts } from '../repositories/account.repository.js';

export const createNewAccount = async (accountData: {
  userId: string;
  balance: number;
}) => {
  if (accountData.balance == null || accountData.balance < 0) {
    throw new BadUserRequestError('Invalid balance amount');
  }
  const data = {
    userId: accountData.userId,
    balance: accountData.balance,
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

  const formattedResult = accountResults.map((account: any) => ({
    account_id: account.account_id,
    balance: parseFloat(account.balance),
    created_at: account.created_at.toISOString().split('T')[0],
  }));

  return formattedResult;
};
