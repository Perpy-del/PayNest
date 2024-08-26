import Joi from 'joi';

export function registerUserValidation(data: any) {
  const schema = Joi.object({
    username: Joi.string().required().trim(),
    first_name: Joi.string().required().trim(),
    last_name: Joi.string().required().trim(),
    email: Joi.string().required().trim(),
    status: Joi.string().valid('active', 'inactive'),
    password: Joi.string().required().trim(),
  });
  return schema.validate(data);
}