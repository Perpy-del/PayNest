import ejs from 'ejs';
import dotenv from 'dotenv';
import transporter from '../../config/nodemail.js';
import env from '../../config/env.js';

dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface EmailData {
  [key: string]: any;
}

const sendEmail = async (to: string, subject: string, template: string, data: EmailData): Promise<void> => {
    try {
      const html = await ejs.renderFile(
        `${__dirname}/templates/${template}.ejs`,
        data,
        { async: true },
      );
  
      const mailOptions = {
        from: env.nodemailer_user,
        to,
        subject,
        html,
      };
  
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log('Error: ', err);
    }
  };
  
  export default sendEmail;