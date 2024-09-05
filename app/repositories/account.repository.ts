import db from '../../config/database/db';

export const getAccounts = async (data: {
  userId: string;
  balance: number;
  start_date: string;
  end_date: string;
}) => {
  let query = db('accounts').where({ user_id: data.userId });

  if (data.balance) {
    query = query.andWhere('balance', '>', data.balance);
  }

  if (data.start_date) {
    query = query.andWhere('created_at', '>=', data.start_date);
  }

  if (data.end_date) {
    query = query.andWhere('created_at', '<=', data.end_date);
  }

  const accounts = await query;

  return accounts;
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
