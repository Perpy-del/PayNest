import { createAccountValidation } from '../middlewares/validation';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils/responseHandler';
import { createNewAccount, getAllAccounts, updateDepositTransaction } from '../services/account.service';

export const createAccountController = async (request: Request | any, response: Response) => {
  try {
    const { error } = createAccountValidation(request.body);

    if (error) return errorResponse(response, error.details[0].message, 400);

    const user = request.user;

    const { balance } = request.body;

    const newAccount = await createNewAccount({
      userId: user.id,
      balance,
    });

    return successResponse(response, 201, true, 'Account created successfully', newAccount);
  } catch (error: any) {
    console.log('Error creating account: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
};

export const getAccountsController = async (request: Request | any, response: Response) => {
  try {
    const userId = request.user?.id;

    const { balance, start_date, end_date } = request.query;

    const accountsResult = await getAllAccounts(userId, balance, start_date, end_date);

    return successResponse(response, 200, true, 'Accounts retrieved successfully', accountsResult);
  } catch (error: any) {
    console.log('Error retrieving accounts: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
};

export const verifyTransactionController = async (request: Request, response: Response) => {
  try {
    const result = await updateDepositTransaction(request.params.accountId, request.body.reference);
    return successResponse(response, 200, true, 'Verification successful', result);
  } catch (error: any) {
    console.log('Error verifying transaction: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
};
