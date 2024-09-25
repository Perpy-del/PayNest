import { Request, Response } from "express"
import { errorResponse, successResponse } from "../utils/responseHandler.js"
import { initializeTransactionValidation } from "../middlewares/validation.js";
import { requestInitTransaction } from "../services/transaction.service.js";

export const initTransactionController = async (req: Request | any, res: Response) => {
  try {
    const { error } = initializeTransactionValidation(req.body);

    if (error) return errorResponse(res, error.details[0].message, 400);

    const userId: string = req.user.id;

    const result = await requestInitTransaction(userId, req.body)

    return successResponse(res, 200, true, "Transaction initialized successfully", result)
  } catch (error: any) {
    console.log("Error initializing transaction: ", error)
    errorResponse(res, error.message, error.statusCode ?? 500)
  }
}
