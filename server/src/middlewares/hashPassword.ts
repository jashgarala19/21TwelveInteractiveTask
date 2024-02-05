import { Response, Request, NextFunction } from "express";
import { hashPassword } from "../utils/hashPassword";

const encryptPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, ...userInfo } = req.body;
  const hashedPassword = await hashPassword(password);
  req.body.password = hashedPassword;
  next();
};

export default encryptPassword;
