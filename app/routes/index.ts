import express from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import accountRouter from './account.route.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/accounts', accountRouter);

export default apiRouter;