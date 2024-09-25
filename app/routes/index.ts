import express from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import accountRouter from './account.route.js';
import transactionRouter from './transaction.route.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/accounts', accountRouter);
apiRouter.use('/transactions', transactionRouter)

export default apiRouter;