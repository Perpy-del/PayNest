import { Request, Response } from 'express';
import { getUserProfile } from '../services/user.service.js';
import { errorResponse, successResponse } from '../utils/responseHandler.js';

export const getUserController = async (
  request: Request | any,
  response: Response
) => {
  try {
    const { id } = request.user;

    const result = await getUserProfile(id);

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
