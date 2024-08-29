import {
  changePasswordService,
  createNewUser,
  loginUserService,
  verifyUserService,
} from '../services/auth.service.js';
import { Request, Response } from 'express';
import {
  loginUserValidation,
  registerUserValidation,
  verifyUserValidation,
} from '../middlewares/validation.js';
import { errorResponse, successResponse } from '../utils/responseHandler.js';

export const verifyUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const { error } = verifyUserValidation(request.body.email);

    if (error) return errorResponse(response, error.details[0].message, 400);

    const result = await verifyUserService(request.body.email);

    return successResponse(
      response,
      200,
      true,
      'OTP sent successfully',
      result
    );
  } catch (error: any) {
    console.log('Error sending OTP: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
};

export const createNewUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const { error } = registerUserValidation(request.body);

    if (error) return errorResponse(response, error.details[0].message, 400);

    const result = await createNewUser(request.body);

    return successResponse(
      response,
      201,
      true,
      'Verification successful',
      result
    );
  } catch (error: any) {
    console.log('Error sending OTP: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
};

export const loginUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const { error } = loginUserValidation(request.body);

    if (error) return errorResponse(response, error.details[0].message, 400);

    const result = await loginUserService(request.body);

    return successResponse(response, 200, true, 'Login successful', result);
  } catch (error: any) {
    console.log('Error sending OTP: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
};

export const changePasswordController = async (
  request: Request,
  response: Response
) => {
  try {
    await changePasswordService(
      request.headers.authorization?.split(' ')[1], request.body
    );

    return successResponse(response, 200, true, 'Password changed successfully', null);
  } catch (error) {
    console.log('Unexpected error: ', error);
    return errorResponse(response, 'An unexpected error occurred', 500);
  }
};
