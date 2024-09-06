import express from 'express';
import authenticateUser from '../middlewares/authMiddleware.ts';
import {
  createAccountController,
  getAccountsController,
} from '../controllers/account.controller.ts';

const accountRouter = express.Router();

accountRouter
  .route('/')
  .post(authenticateUser, createAccountController)
  .get(authenticateUser, getAccountsController);

export default accountRouter;
