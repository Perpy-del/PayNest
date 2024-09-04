import express from 'express';
import authenticateUser from '../middlewares/authMiddleware.js';
import { getUserController } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/profile', authenticateUser, getUserController);

export default userRouter;
