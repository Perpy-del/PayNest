import { Request, Response } from "express"
import { errorResponse, successResponse } from "../utils/responseHandler.js"
import { initializeTransactionValidation } from "../middlewares/validation.js";
import { requestInitTransaction } from "../services/transaction.service.js";

export interface InitTransactionRequest extends Request {
  user?: { id: string };
}

export const initTransactionController = async (req: InitTransactionRequest, res: Response) => {
  try {
    const { error } = initializeTransactionValidation(req.body);

    if (error) return errorResponse(res, error.details[0].message, 400);

    const userId = req.user?.id;

    const result = await requestInitTransaction(req.body, userId)

    return successResponse(res, 200, true, "Transaction initialized successfully", result)
  } catch (error: any) {
    console.log("Error initializing transaction: ", error)
    errorResponse(res, error.message, error.statusCode ?? 500)
  }
}
