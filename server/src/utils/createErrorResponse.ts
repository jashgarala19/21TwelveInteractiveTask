import { Response } from "express";

export const createErrorResponse = (
  res: Response,
  errStatusCode: number,
  errMsg: string,
  errStack?: string
) => {
  const response = {
    error: {
      success: false,
      code: errStatusCode,
      message: errMsg,
      stack: process.env.NODE_ENV === "development" ? errStack : undefined,
    },
  };

  return res.status(errStatusCode).json(response);
};
