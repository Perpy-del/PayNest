import twilio from 'twilio';
import env from '../../config/env.js';

export const verifyUser = async (phone_number: string) => {
  try {
    const client = twilio(env.twilio_account, env.twilio_token);

    const result = await client.messages.create({
      body: 'Your verification token is 12345',
      from: env.twilio_sender,
      to: phone_number,
    });

    console.log('SMS RESULT', result);

    return result;
  } catch (error) {
    console.error(error);
  }
};
