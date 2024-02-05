import { Response, Request, NextFunction } from "express";
import CustomError from "../errHandler/CustomError";

const   validateParamObjectId = (schema: any) => {
  return (req: Request, _: any, next: NextFunction) => {
   
    const { id } = req.params;
    const { error } = schema.validate({ id });

    if (error) throw new CustomError(error.message, 400);
    next();
  };
};

export default validateParamObjectId;
