import { Response } from "express";

export const successResponse = (res: Response, statusCode: number, status: boolean, message: string, data: {} | null = {}) => {
  res.status(statusCode).json({
    success: status,
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
