import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: {
    email: string;
    role: string;
    status?: string;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
