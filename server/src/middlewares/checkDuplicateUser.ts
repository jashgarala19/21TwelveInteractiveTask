import { Response, Request, NextFunction } from "express";
import User from "../models/user";
import { createErrorResponse } from "../utils/createErrorResponse";

const checkDuplicateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, email } = req.body;

  const existingUserByUsername = await User.findOne({ userName });

  if (existingUserByUsername)
    return createErrorResponse(res, 400, "Username exists");

  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) return createErrorResponse(res, 400, "Email exists");

  next();
};

export default checkDuplicateUser;
