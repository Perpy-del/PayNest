import nodemailer from 'nodemailer'
import env from './env'


console.log("ENV: ", env);
const transporter = nodemailer.createTransport({
  service: env.nodemailer_service,
  auth: {
    user: env.nodemailer_user,
    pass: env.nodemailer_pass,
  },
})

export default transporter
