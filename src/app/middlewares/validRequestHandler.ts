import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import asyncHandler from "../utils/asyncHandler";

const validRequestHandler = (schema: AnyZodObject) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({ body: req.body });
      next();
    }
  );
};

export default validRequestHandler;
