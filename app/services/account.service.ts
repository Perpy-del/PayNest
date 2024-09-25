import https from 'https';
import env from '../../config/env.ts';
import BadUserRequestError from '../errors/BadUserRequestError.ts';
import {
  createAccount,
  getAccount,
  getAccounts,
  updateAccountBalance,
} from '../repositories/account.repository.ts';
import {
  getTransactionByUserId,
  updateTransaction,
} from '../repositories/transaction.repository.ts';
import { createTransfer } from '../repositories/transfer.repository.ts';

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
  const accountResults = await getAccounts(
    userId,
    balance,
    start_date,
    end_date
  );

  const formattedResult = accountResults.map((account: any) => ({
    account_id: account.account_id,
    balance: parseFloat(account.balance),
    created_at: account.created_at.toISOString().split('T')[0],
  }));

  return formattedResult;
};

export const verifyPaystack = async (reference: string) => {
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/transaction/verify/${reference}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${env.paystack_secret}`,
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
      console.error('Error verifying paystack transaction: ', error);
      reject(error);
    });

    req.end();
  });
};

export const updateDepositTransaction = async (
  accountId: string,
  userId: string
) => {
  /* 
  Verify Reference: The system verifies the transaction reference with Paystack to ensure its validity and retrieves the transaction amount.
  */
  const existingTxn = await getTransactionByUserId(userId);
 
  const reference = existingTxn.reference;

  const paystackResponse: any = await verifyPaystack(reference);

  if (!paystackResponse.status || paystackResponse.data.status !== 'success') {
    throw new BadUserRequestError(
      'Deposit transaction failed. Please try again'
    );
  }

  /**
   * Check Transaction Status: The system checks the transaction status in the database to ensure it is not already finalised.
   */

  if (existingTxn.status !== 'pending') {
    throw new BadUserRequestError(
      'This transaction has already been confirmed'
    );
  }
  /**
   * Process Transaction: If the status is valid, the system updates the transaction status and deposits the amount into the user's account using database increments.
   */

  const account = await getAccount(accountId);

  const currentBalance = parseFloat(account.balance);
  const depositAmount = parseFloat(existingTxn.amount);
  const newBalance = currentBalance + depositAmount;

  const formattedBal = newBalance.toFixed(2);

  // Update the transaction details status to completed
  const updatedAccount = await updateAccountBalance(accountId, formattedBal);

  const updatedTxn = await updateTransaction(existingTxn.id, {
    status: 'completed',
    source: paystackResponse.data.channel,
    type: 'credit',
  });

  // /**
  //  * Return Data: The system returns the updated transaction details and the new account balance.
  //  */

  const data = {
    transaction_id: updatedTxn.id,
    status: updatedTxn.status,
    amount: existingTxn.amount,
    account_balance: updatedAccount.balance,
  };

  return data;
  /*
​
Sample Response:
{
  "success": true,
  "message": "Deposit processed successfully",
  "data": {
    "transaction_id": "98765",
    "status": "successful",
    "amount": 100.00,
    "account_balance": 1100.00
  }
}
   */
};
