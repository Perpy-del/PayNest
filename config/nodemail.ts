import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import env from './env.js';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: env.nodemailer_service,
  auth: {
    user: env.nodemailer_user,
    pass: env.nodemailer_pass,
  },
});

export default transporter;
