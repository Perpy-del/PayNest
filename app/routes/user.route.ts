import express from 'express';
import authenticateUser from '../middlewares/authMiddleware';
import { getUserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/profile', authenticateUser, getUserController);

export default userRouter;
