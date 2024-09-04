// import { v4 as uuidv4 } from 'uuid';
import db from '../../config/database/db.js';

export const getUser = async (userId: string) => {
  const userData = await db('users')
    .select(
      'users.id as user_id',
      'users.email',
      'users.first_name',
      'users.last_name',
      'accounts.id as account_id',
      'accounts.balance'
    )
    .innerJoin('accounts', 'users.id', '=', 'accounts.user_id')
    .where('users.id', userId)
    .first();

  return userData;  
};
