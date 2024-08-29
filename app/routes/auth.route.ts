import express from 'express';
import { changePasswordController, createNewUserController, loginUserController, verifyUserController } from "../controllers/auth.controller.js";
import authenticateUser from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/verify', verifyUserController);
authRouter.post('/signup', createNewUserController);
authRouter.post('/login', loginUserController);

authRouter.patch('/change-password', authenticateUser, changePasswordController);

export default authRouter;