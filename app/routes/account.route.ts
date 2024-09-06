import express from 'express';
import authenticateUser from '../middlewares/authMiddleware.js';
import {
  createAccountController,
  getAccountsController,
} from '../controllers/account.controller.js';

const accountRouter = express.Router();

accountRouter
  .route('/')
  .post(authenticateUser, createAccountController)
  .get(authenticateUser, getAccountsController);

export default accountRouter;
