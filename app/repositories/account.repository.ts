import db from '../../config/database/db.ts';
import dateConversion from '../utils/dateConversion.ts';

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

  return query;
};

export const createAccount = async (data: {
  userId: string;
  balance: number;
}) => {
  const [newAccount] = await db('accounts')
    .insert({
      user_id: data.userId,
      balance: data.balance,
    })
    .returning('*');

  return newAccount;
};
