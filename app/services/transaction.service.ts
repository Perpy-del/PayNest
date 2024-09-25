import https from 'https';
import env from '../../config/env.js';
import { Transaction } from '../interfaces/transaction.interface.js';
import { initTransaction } from '../repositories/transaction.repository.js';
import BadUserRequestError from '../errors/BadUserRequestError.js';
import {
  getUser,
  getUserByAccountId,
} from '../repositories/user.repository.js';
import { getAccounts } from '../repositories/account.repository.js';

export const initializeTransaction = async (email: string, amount: string) => {
  const params = JSON.stringify({
    email,
    amount,
  });

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.paystack_secret}`,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', error => {
      reject(error);
    });

    req.write(params);
    req.end();
  });
};

/**
 * Initialize the transaction using paystack
 * @param userId id of the user making the transaction
 * @param data {amount, description}
 * @returns transaction data {transaction_id, reference, status, authorization_url}
 */

export const requestInitTransaction = async (
  userId: string,
  data: Transaction
) => {
  const accountData = await getUserByAccountId(data.accountId);

  const amountInCents = Math.round(parseFloat(data.amount as string) * 100);

  const result: any = await initializeTransaction(
    accountData.email,
    amountInCents.toString()
  );

  if (!result?.status) {
    throw new BadUserRequestError('Error initializing transaction');
  }

  typeof data.amount === 'string' ? Number(data.amount) : data.amount;

  const txnData = {
    amount: data.amount,
    description: data.description,
    reference: result.data.reference,
    transactionDate: new Date(),
    user_id: userId,
    account_id: data.accountId,
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
