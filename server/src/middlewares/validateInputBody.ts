import { Response, Request, NextFunction } from "express";
import CustomError from "../errHandler/CustomError";

const validateInputBody = (schema: any) => {
  return (req: Request, _: any, next: NextFunction) => {
 
    const data = req.body;
    const { error } = schema.validate(data);

    if (error) throw new CustomError(error.message, 400);
    next();
  };
};

export default validateInputBody;
