import db from '../../config/database/db.ts';
import dateConversion from '../utils/dateConversion.ts';

export const getAccounts = async (
  userId: string,
  balance?: number,
  start_date?: string,
  end_date?: string
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

export const getAccount = async (accountId: string) => {
  const [account] = await db('accounts')
    .where({ id: accountId })
    .select('id', 'user_id', 'balance', 'created_at')
    .first();

  if (!account) {
    throw new Error(`Account with ID ${accountId} not found`);
  }

  return account;
};

export const updateDepositAccountBalance = async (accountId: string | number, amount: number) => {
  let updatedAccount;

  await db.transaction(async (trx) => {
    const [account] = await trx('accounts')
      .where({ id: accountId })
      .increment('balance', amount)
      .returning('*');

    if (!account) {
      throw new Error(`Account with ID ${accountId} not found`);
    }

    updatedAccount = account;
  });

  if (!updatedAccount) {
    throw new Error('Failed to update account balance');
  }

  return updatedAccount;
}

export const updateWithdrawalAccountBalance = async (accountId: string | number, amount: number) => {
  let updatedAccount;

  await db.transaction(async (trx) => {
    const [account] = await trx('accounts')
      .where({ id: accountId })
      .decrement('balance', amount)
      .returning('*');

    if (!account) {
      throw new Error(`Account with ID ${accountId} not found`);
    }

    updatedAccount = account;
  });

  if (!updatedAccount) {
    throw new Error('Failed to update account balance');
  }

  return updatedAccount;
}
