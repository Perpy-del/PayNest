import 'dotenv/config';

export default {
  port: process.env.PORT,
  database_client: process.env.DB_CLIENT,
  database_name: process.env.DB_NAME,
  database_user: process.env.DB_USER,
  database_pass: process.env.DB_PASSWORD,
  salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_expiration: process.env.JWT_EXPIRATION,
  jwt_access: process.env.APP_SECRET,
  jwt_issuer: process.env.JWT_ISSUER,

  // NODEMAILER ENV PARAMETERS/VARIABLES
  nodemailer_user: process.env.NODEMAILER_USER,
  nodemailer_pass: process.env.NODEMAILER_PASSWORD,
  nodemailer_service: process.env.NODEMAILER_SERVICE,

  // TWILIO ENV PARAMETERS/VARIABLES
  twilio_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_account: process.env.TWILIO_ACCOUNT_SID,
  twilio_sender: process.env.TWILIO_SENDER_NUMBER,

  // PAYSTACK PARAMETERS
  paystack_secret: process.env.PAYSTACK_SECRET_KEY,
  paystack_pkey: process.env.PAYSTACK_PUBLIC_KEY,
};
