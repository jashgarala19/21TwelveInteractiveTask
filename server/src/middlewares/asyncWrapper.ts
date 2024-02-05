import { Response, Request, NextFunction } from "express";

const asyncWrapper = (fn: (req: Request, res: Response) => void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (err) {
      next(err);
    }
  };
};

export default asyncWrapper;
