import { Request, Response } from 'express';
import { getUserProfile } from '../services/user.service.js';
import { errorResponse, successResponse } from '../utils/responseHandler.js';

export const getUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const result = await getUserProfile(
      request.headers.authorization?.split(' ')[1] as string
    );

    return successResponse(
      response,
      200,
      true,
      'User details retrieved successfully',
      result
    );
  } catch (error: any) {
    console.log('Error logging in user: ', error.message);
    return errorResponse(response, error.message, error.statusCode ?? 500);
  }
};
