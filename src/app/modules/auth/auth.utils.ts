import jwt from "jsonwebtoken";
import { TUserRole } from "../user/user.interface";

export const createToken = (
  jwtPayload: {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    role: TUserRole;
    address?: string;
    profileImage?: string;
    coverImage?: string;
    dateOfBirth?: Date;
    status: "Basic" | "Premium";
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
