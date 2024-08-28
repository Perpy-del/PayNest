import express from 'express';
import { createNewUserController, loginUserController, verifyUserController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/verify', verifyUserController);
authRouter.post('/signup', createNewUserController);
authRouter.post('/login', loginUserController);

export default authRouter;