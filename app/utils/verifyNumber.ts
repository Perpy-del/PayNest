import twilio from 'twilio';
import { config } from '../../config/envConfig.js';

export const verifyUser = async(phone_number: string) => {
    try {
      const client = twilio(
        config.twilio_account,
        config.twilio_token
      );
  
      const result = await client.messages.create({
        body: 'Your verification token is 12345',
        from: config.twilio_sender,
        to: phone_number,
      });
  
      console.log('SMS RESULT', result);
  
      return result;
    } catch (error) {
      console.error(error);
    }
  };