/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TUserRole = "admin" | "user";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: TUserRole;
  address?: string;
  profileImage?: string;
  coverImage?: string;
  dateOfBirth?: Date;
  status: "Basic" | "Premium";
}

export interface IUserWithoutPassword {
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
}

export interface IUserMethod extends Model<IUser> {
  isUserExist(email: string): Promise<IUser>;
  isMatchPassword(
    plainPassword: string,
    hashPassword: string
  ): Promise<boolean>;
}
