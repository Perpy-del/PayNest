import { Request, Response, NextFunction } from "express";

export const catchAsyncError = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
  const response = await fn(req, res, next).catch(next);
  return response;
};
