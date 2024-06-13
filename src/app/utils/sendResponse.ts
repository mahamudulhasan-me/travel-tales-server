import { Response } from "express";
interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  token?: string;
  data: T;
}

const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  return res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    token: data.token,
    data: data.data,
  });
};

export default sendResponse;
