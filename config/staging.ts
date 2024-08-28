import dotenv from 'dotenv';
dotenv.config();

// setting up node development environment
export const staging = {
  port: process.env.PORT,
  database_client: process.env.STAGING_DB_CLIENT,
  database_name: process.env.STAGING_DB_NAME,
  database_user: process.env.STAGING_DB_USER,
  database_pass: process.env.STAGING_DB_PASSWORD,
  salt_round: process.env.STAGING_BCRYPT_SALT_ROUND,
  jwt_expiration: process.env.JWT_EXPIRATION,
  jwt_access: process.env.STAGING_APP_SECRET,
  jwt_issuer: process.env.STAGING_JWT_ISSUER,

  // NODEMAILER ENV PARAMETERS/VARIABLES
  nodemailer_user: process.env.NODEMAILER_USER,
  nodemailer_pass: process.env.NODEMAILER_PASSWORD,
  nodemailer_service: process.env.NODEMAILER_SERVICE,

  // TWILIO ENV PARAMETERS/VARIABLES
  twilio_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_account: process.env.TWILIO_ACCOUNT_SID,
  twilio_sender: process.env.TWILIO_SENDER_NUMBER,
};
