import { NextFunction, Request, RequestHandler, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

const auth = (): RequestHandler => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
};

export default auth;
