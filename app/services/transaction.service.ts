import axios from 'axios';
import env from '../../config/env';
import { Transaction, TransactionDTO } from '../interfaces/transaction.interface';
import { initTransaction } from '../repositories/transaction.repository';
import BadUserRequestError from '../errors/BadUserRequestError';
import { getUserByAccountId } from '../repositories/user.repository';

export const initializeTransaction = async (email: string, amount: number) => {
  const params = JSON.stringify({
    email,
    amount,
  });

  try {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', params, {
      headers: {
        Authorization: `Bearer ${env.paystack_secret}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Initialize the transaction using paystack
 * @param userId id of the user making the transaction
 * @param data {amount, description}
 * @returns transaction data {transaction_id, reference, status, authorization_url}
 */

export const requestInitTransaction = async (data: TransactionDTO, userId?: string) => {
  const accountData = await getUserByAccountId(data.accountId);

  const amountInCents = data.amount * 100;

  const result: any = await initializeTransaction(accountData.email, amountInCents);

  if (!result?.status) {
    throw new BadUserRequestError('Error initializing transaction');
  }

  const txnData = {
    amount: data.amount,
    description: data.description,
    reference: result.data.reference,
    transaction_date: new Date(),
    user_id: userId,
    account_id: data.accountId,
    type: 'credit',
  };

  const transaction = await initTransaction(txnData);

  const txnResult = {
    transaction_id: transaction.id,
    reference: transaction.reference,
    status: transaction.status,
    authorization_url: result.data.authorization_url,
  };

  return txnResult;
};
