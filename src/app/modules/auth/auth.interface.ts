import { Model } from "mongoose";

export interface ISignup {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserMethod extends Model<ISignup> {
  isUserExist(email: string): Promise<ISignup>;
  isMatchPassword(
    plainPassword: string,
    hashPassword: string
  ): Promise<Boolean>;
}
