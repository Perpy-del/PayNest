import express from 'express';
import { changePasswordController, createNewUserController, loginUserController, resetPasswordRequestController, verifyUserController } from "../controllers/auth.controller.js";
import authenticateUser from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/verify', verifyUserController);
authRouter.post('/signup', createNewUserController);
authRouter.post('/login', loginUserController);

authRouter.patch('/change-password', authenticateUser, changePasswordController);
authRouter.post('/reset-password-request', resetPasswordRequestController);

export default authRouter;