import { Response, Request, NextFunction } from "express";
import { createErrorResponse } from "../utils/createErrorResponse";
import verifyJWT from "../utils/verifyJWT";
interface AuthenticatedRequest extends Request {
  user?: object | string | number; // Replace 'any' with the actual type of your user object
}
const verifyAccessToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
 
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token)
    return createErrorResponse(res, 401, "Please provide Access Token");
  const { error, payload }: { error: any; payload: any } = verifyJWT(
    token,
    process.env.JWT_SECRET_KEY
  );

  if (error) {
    return createErrorResponse(res, 401, error.message);
  }

  req.user = payload;
  next();
};

export default verifyAccessToken;
