import { Response } from "express";

export const createSuccessResponse = (
  res: Response,
  data: any = null,
  statusCode: number = 200,
  message: string = ""
) => {
  const response = {
    data: {
      payload: data,
      success: true,
      code: statusCode,
      message: message,
    },
  };

  return res.status(statusCode).json(response);
};
