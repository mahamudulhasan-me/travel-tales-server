import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import asyncHandler from "../utils/asyncHandler";

const auth = (...roles: TUserRole[]): RequestHandler => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new AppError(401, "You have no access to this route");
      }

      jwt.verify(token, config.jwt_access_secret as string, (err, user) => {
        if (err) {
          throw new AppError(401, "You have no access to this route");
        }

        const { role } = user as JwtPayload;

        if (role && !roles.includes(role)) {
          throw new AppError(401, "You have no access to this route");
        }

        req.user = user as JwtPayload;
      });
      next();
    }
  );
};

export default auth;
