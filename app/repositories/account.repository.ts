import db from '../../config/database/db.js';
import dateConversion from '../utils/dateConversion.js';

export const getAccounts = async (
  userId: string,
  balance: number,
  start_date: string,
  end_date: string
) => {
  const query = await db('accounts')
    .where({ user_id: userId })
    .modify(queryBuilder => {
      if (balance) {
        queryBuilder.where('balance', '>', balance);
      }
      if (start_date) {
        queryBuilder.where('created_at', '>=', dateConversion(start_date));
      }
      if (end_date) {
        queryBuilder.where('created_at', '<=', dateConversion(end_date));
      }
    })
    .select('id as account_id', 'balance', 'created_at');

  const formattedResult = query.map((account: any) => ({
    account_id: account.account_id,
    balance: parseFloat(account.balance),
    created_at: account.created_at.toISOString().split('T')[0],
  }));

  return formattedResult;
};

export const createAccount = async (data: {
  userId: string;
  balance: number;
  isDefault: boolean;
}) => {
  const [newAccount] = await db('accounts')
    .insert({
      user_id: data.userId,
      balance: data.balance,
      is_default: data.isDefault,
    })
    .returning('*');

  return newAccount;
};
