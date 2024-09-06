import express from 'express';
import authRouter from './auth.route.ts';
import userRouter from './user.route.ts';
import accountRouter from './account.route.ts';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/accounts', accountRouter);

export default apiRouter;