import { Response } from 'express';

export const successResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: Record<string, unknown> | null = {},
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export const errorResponse = (res: Response, message: string, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
