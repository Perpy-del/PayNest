import { Knex } from 'knex';
import db from '../../config/database/db';
import NotFoundError from '../errors/NotFoundError';

const getUserQuery = (db: Knex) =>
  db('users')
    .select(
      'users.id as user_id',
      'users.email',
      'users.first_name',
      'users.last_name',
      'accounts.id as account_id',
      'accounts.balance',
    )
    .innerJoin('accounts', 'users.id', '=', 'accounts.user_id');

export const getUser = async (userId: string) => {
  const userData = await getUserQuery(db).where('user_id', userId).first();

  return userData;
};

// Get user by their account ID
export const getUserByAccountId = async (accountId?: string | number) => {
  if (!accountId) {
    throw new NotFoundError('Account ID is required');
  }

  const userData = await getUserQuery(db).where('accounts.id', accountId).first();

  return userData;
};
