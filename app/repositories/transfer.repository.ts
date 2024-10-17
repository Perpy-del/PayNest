import { v4 as uuidv4 } from 'uuid';
import db from '../../config/database/db';
import BadUserRequestError from '../errors/BadUserRequestError';

export const createTransfer = async (data: TransferData) => {
  try {
    // Validate input data
    if (!data.transactionId || !data.fromAccount || !data.toAccount) {
      throw new Error('Invalid transfer data');
    }

    const [newTransfer] = await db('transfers').insert({
      id: uuidv4(),
      transaction_id: data.transactionId,
      from_account_id: data.fromAccount,
      to_account_id: data.toAccount,
    });

    return newTransfer;
  } catch (error) {
    console.error('Error creating transfer:', error);
    throw new BadUserRequestError('Error creating transfer');
  }
};
