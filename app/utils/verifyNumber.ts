import twilio from 'twilio';
import env from '../../config/env.ts';

export const verifyUser = async (phone_number: string, token: string) => {
  try {
    const client = twilio(env.twilio_account, env.twilio_token);

    const result = await client.messages.create({
      body: `Your verification token is ${token}`,
      from: env.twilio_sender,
      to: phone_number,
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};
