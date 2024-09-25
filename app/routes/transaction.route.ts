import express from 'express';
import authenticateUser from '../middlewares/authMiddleware.js';
import { initTransactionController } from '../controllers/transaction.controller.js';

const transactionRouter = express.Router();

transactionRouter.post('/init', authenticateUser, initTransactionController);

export default transactionRouter;