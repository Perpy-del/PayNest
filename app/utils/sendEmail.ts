import ejs from 'ejs';
import transporter from '../../config/nodemail';
import env from '../../config/env';

interface EmailData {
  [key: string]: any;
}

const sendEmail = async (to: string, subject: string, template: string, data: EmailData): Promise<void> => {
  try {
    const html = await ejs.renderFile(`${__dirname}/templates/${template}.ejs`, data, {
      async: true,
    });

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
