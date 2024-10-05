import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import asyncHandler from "../utils/asyncHandler";

const protectedRoute = (): RequestHandler => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new AppError(401, "You have no access to this route 1");
      }

      jwt.verify(token, config.jwt_access_secret as string, (err, user) => {
        if (err) {
          throw new AppError(401, "You have no access to this route 2");
        }

        req.user = user as JwtPayload;
      });
      next();
    }
  );
};

export default protectedRoute;
