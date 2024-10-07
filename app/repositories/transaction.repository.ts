import { v4 as uuidv4 } from 'uuid';
import db from '../../config/database/db.ts';
import { Transaction } from '../interfaces/transaction.interface.ts';

export const initTransaction = async (data: Transaction) => {
  const [transaction] = await db('transactions')
    .insert({
      id: uuidv4(),
      amount: data.amount,
      type: data.type,
      description: data.description,
      reference: data.reference,
      transaction_date: data.transactionDate,
      source: data.source,
      user_id: data.user_id,
      account_id: data.account_id,
    })
    .returning('*');

  return transaction;
};

export const getTransactionByAccountId = async (accountId: string) => {
  const transaction = await db('transactions')
    .where('transactions.account_id', accountId)
    .first();

  return transaction;
};

export const getAllUserTransactions = async (userId?: string) => {
  const transaction = await db('transactions')
    .where('transactions.user_id', userId)
    .orderBy('created_at', 'desc');

  return transaction;
};

export const getTransactionByUserId = async (userId?: string) => {
  const transaction = await db('transactions')
    .where('transactions.user_id', userId)
    .orderBy('created_at', 'desc')
    .first();

  return transaction;
};

export const getTransactionByReference = async (reference?: string) => {
  const transaction = await db('transactions')
    .where('transactions.reference', reference)
    .first();

  return transaction;
};

export const updateTransaction = async (txnId: string, updateData: Transaction) => {
  const [updatedTxn] = await db('transactions')
    .where('id', txnId)
    .update(updateData)
    .returning('*');

  return updatedTxn;
};
