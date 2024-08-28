import Joi from 'joi';
import { LoginUserValidationType, RegisterUserValidationType } from '../interfaces/auth.interface';

export function verifyUserValidation(data: {email: string}) {
  const schema = Joi.object({
    email: Joi.string().email().required().trim()
  });

  return schema.validate(data);
}
}

export function registerUserValidation(data: RegisterUserValidationType) {
  const schema = Joi.object({
    username: Joi.string().required().trim(),
    otp: Joi.string().required(),
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().min(6).max(50).trim(),
  });
  return schema.validate(data);
}

export function loginUserValidation(data: LoginUserValidationType) {
  const schema = Joi.object({
    email: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
  });
  return schema.validate(data);
}