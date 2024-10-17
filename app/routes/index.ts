import express from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';
import accountRouter from './account.route';
import transactionRouter from './transaction.route';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/accounts', accountRouter);
apiRouter.use('/transactions', transactionRouter);

export default apiRouter;
