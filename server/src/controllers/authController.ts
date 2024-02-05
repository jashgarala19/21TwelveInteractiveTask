import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import asyncWrapper from "../middlewares/asyncWrapper";
import bcrypt from "bcryptjs";
import { createSuccessResponse } from "../utils/createSuccessResponse";
import { createErrorResponse } from "../utils/createErrorResponse";

import generateAccessToken from "../utils/generateAccessToken";
export const login = async (req: Request, res: Response) => {
  const { email, password: clientInputPassword } = req.body;

  const user = await User.findOne({ email });
  const dbPassword = user.password;
  if (!user) {
    return createErrorResponse(res, 401, "Invalid Credentials");
  }

  const passwordMatch = await bcrypt.compare(clientInputPassword, dbPassword);
  if (!passwordMatch) {
    return createErrorResponse(res, 401, "Invalid Credentials");
  }

  const parsedUserData = JSON.parse(JSON.stringify(user));
  const { password, dateJoined, ...payload } = parsedUserData;
  const token = generateAccessToken(payload, process.env.JWT_SECRET_KEY, "5h");
  res.header("Access-Control-Expose-Headers", "*");
  res.setHeader("Authorization", `Bearer ${token}`);
 
  createSuccessResponse(res, payload, 200, "Login Success");
};

export const register = asyncWrapper(async (req: Request, res: Response) => {
  const userInfo = req.body;
  const user = new User({
    ...userInfo,
  });
  await user.save();

  createSuccessResponse(res, null, 200, "Registered Successfully");
});
