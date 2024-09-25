import Joi from 'joi';
import { LoginUserValidationType, RegisterUserValidationType } from '../interfaces/auth.interface';
import { Transaction } from '../interfaces/transaction.interface';

export function verifyUserValidation(data: {email: string}) {
  const schema = Joi.object({
    email: Joi.string().email().required().trim()
  });

  return schema.validate(data);
};

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
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
  });
  return schema.validate(data);
}

export function resetPasswordValidation(data: {email: string; otp: string; newPassword: string; confirmPassword: string}) {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    otp: Joi.string().required().trim(),
    newPassword: Joi.string().required().trim(),
    confirmPassword: Joi.string().required().trim(),
  })

  return schema.validate(data);
}

export function createAccountValidation(data: {balance: number; isDefault: boolean}) {
  const schema = Joi.object({
    balance: Joi.number().precision(2).required(),
  })

  return schema.validate(data);
}

export function initializeTransactionValidation(data: Transaction) {
  const schema = Joi.object({
    amount: Joi.alternatives().try(Joi.number().precision(2), Joi.string()).required(),
    // type: Joi.string().required(),
    description: Joi.string().optional().trim(),
    source: Joi.string().optional().trim(),
    status: Joi.string().optional().trim(),
    accountId: Joi.alternatives().try(Joi.number(), Joi.string()).required()
  })

  return schema.validate(data);
}
