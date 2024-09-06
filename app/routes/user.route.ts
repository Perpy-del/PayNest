import express from 'express';
import authenticateUser from '../middlewares/authMiddleware.ts';
import { getUserController } from '../controllers/user.controller.ts';

const userRouter = express.Router();

userRouter.get('/profile', authenticateUser, getUserController);

export default userRouter;
