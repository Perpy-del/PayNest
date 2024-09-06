import express from 'express';
import { changePasswordController, createNewUserController, loginUserController, resetPasswordController, resetPasswordRequestController, verifyUserController } from "../controllers/auth.controller.ts";
import authenticateUser from '../middlewares/authMiddleware.ts';

const authRouter = express.Router();

authRouter.post('/verify', verifyUserController);
authRouter.post('/signup', createNewUserController);
authRouter.post('/login', loginUserController);

authRouter.patch('/change-password', authenticateUser, changePasswordController);
authRouter.post('/reset-password-request', resetPasswordRequestController);
authRouter.put('/reset-password', resetPasswordController);

export default authRouter;