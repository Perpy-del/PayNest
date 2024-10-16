import express from 'express';
import authenticateUser from '../middlewares/authMiddleware';
import {
  createAccountController,
  getAccountsController,
  verifyTransactionController,
} from '../controllers/account.controller';

const accountRouter = express.Router();

accountRouter.route('/').post(authenticateUser, createAccountController).get(authenticateUser, getAccountsController);

accountRouter.post('/:accountId/deposit', authenticateUser, verifyTransactionController);

export default accountRouter;
