import {
  getNewPassword,
  createNewUser,
  loginUser,
  resetPasswordRequest,
  resetPassword,
  verifyUser,
} from '../services/auth.service.js';
import { Request, Response } from 'express';
import {
  loginUserValidation,
  registerUserValidation,
  resetPasswordValidation,
  verifyUserValidation,
} from '../middlewares/validation.js';
import { errorResponse, successResponse } from '../utils/responseHandler.js';
import { catchAsyncError } from '../utils/tryCatchHandler.js';

export const verifyUserController = catchAsyncError(async (
  request: Request,
  response: Response
) => {
  try {
    const { email } = request.body;
    const { error } = verifyUserValidation(email);

    if (error) return errorResponse(response, error.details[0].message, 400);

    const result = await verifyUser(request.body.email);

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
});

export const createNewUserController = catchAsyncError(async (
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
    console.log('Error verifying user: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
});

export const loginUserController = catchAsyncError(async (
  request: Request,
  response: Response
) => {
  try {
    const { error } = loginUserValidation(request.body);

    if (error) return errorResponse(response, error.details[0].message, 400);

    const result = await loginUser(request.body);

    return successResponse(response, 200, true, 'Login successful', result);
  } catch (error: any) {
    console.log('Error logging in user: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
});

export const changePasswordController = catchAsyncError(async (
  request: Request,
  response: Response
) => {
  try {
    await getNewPassword(
      request.headers.authorization?.split(' ')[1],
      request.body
    );

    return successResponse(
      response,
      200,
      true,
      'Password changed successfully',
      null
    );
  } catch (error: any) {
    console.log('Error changing password: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
});

export const resetPasswordRequestController = catchAsyncError(async (
  request: Request,
  response: Response
) => {
  try {
    const { error } = verifyUserValidation(request.body);

    if (error) return errorResponse(response, error.details[0].message, 400);

    await resetPasswordRequest(request.body.email);

    return successResponse(
      response,
      200,
      true,
      'Password reset instructions sent',
      null
    );
  } catch (error: any) {
    console.log('Error sending password request: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
});

export const resetPasswordController = catchAsyncError(async (
  request: Request,
  response: Response
) => {
  try {
    const { error } = resetPasswordValidation(request.body);

    if (error) return errorResponse(response, error.details[0].message, 400);

    await resetPassword(request.body);

    return successResponse(
      response,
      200,
      true,
      'Password reset successful',
      null
    );
  } catch (error: any) {
    console.log('Error resetting password: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
});
