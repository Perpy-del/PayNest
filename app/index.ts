import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import rotatingFileStream from '../config/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(logger('combined', { stream: rotatingFileStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export default app;
