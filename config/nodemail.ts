import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { config } from '../config/envConfig.js';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: config.nodemailer_service,
  auth: {
    user: config.nodemailer_user,
    pass: config.nodemailer_pass,
  },
});

export default transporter;