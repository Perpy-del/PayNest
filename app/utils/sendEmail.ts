import ejs from 'ejs';
import dotenv from 'dotenv';
import transporter from '../../config/nodemail.js';
import {config} from '../../config/envConfig.js';

dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sendEmail = async (to: string, subject: string, template: string, data: {}) => {
    try {
      const html = await ejs.renderFile(
        `${__dirname}/templates/${template}.ejs`,
        data,
        { async: true },
      );
  
      const mailOptions = {
        from: config.nodemailer_user,
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