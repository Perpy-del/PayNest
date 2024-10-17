import express from 'express';
import authenticateUser from '../middlewares/authMiddleware';
import { initTransactionController } from '../controllers/transaction.controller';

const transactionRouter = express.Router();

transactionRouter.post('/init', authenticateUser, initTransactionController);

export default transactionRouter;
