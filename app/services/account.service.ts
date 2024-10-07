import axios from 'axios';
import env from '../../config/env.ts';
import BadUserRequestError from '../errors/BadUserRequestError.ts';
import {
  createAccount,
  getAccount,
  getAccounts,
  updateDepositAccountBalance,
} from '../repositories/account.repository.ts';
import {
  getTransactionByReference,
  updateTransaction,
} from '../repositories/transaction.repository.ts';
import { Account } from '../interfaces/account.interface.ts';

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
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${env.paystack_secret}`,
      },
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new BadUserRequestError('Error verifying transaction')
  }
};

export const updateDepositTransaction = async (
  accountId: string,
  reference: string
) => {
  /* 
  Verify Reference: The system verifies the transaction reference with Paystack to ensure its validity and retrieves the transaction amount.
  */
  const existingTxn = await getTransactionByReference(reference);

  const paystackResponse: any = await verifyPaystack(reference);

  if (!paystackResponse.status || paystackResponse.data.status !== 'success') {
    console.error('Paystack verification error:', paystackResponse);
    throw new BadUserRequestError(
      'Deposit transaction failed due to unsuccessful verification with Paystack. Please try again.'
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

  // Update the transaction details status to completed
  const updatedAccount: Account = await updateDepositAccountBalance(accountId, existingTxn.amount);

  const updatedTxn = await updateTransaction(existingTxn.id, {
    status: 'completed',
    source: paystackResponse.data.channel || 'unknown',
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
};
