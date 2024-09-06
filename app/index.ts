import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import rotatingFileStream from '../config/logger.ts';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './routes/index.ts';

dotenv.config();

const app = express();

app.use(cors());
app.use(logger('combined', { stream: rotatingFileStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', apiRouter)

app.get('/', (req, res) => {
    res.send('Welcome to PayNest App...😀')
})

export default app;
