import mongoose from "mongoose";
import { TErrorMessage, TGenericErrorResponse } from "../interfaces/error";

const castErrorHandler = (
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorMessage: TErrorMessage = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  return {
    statusCode: 400,
    message: "Cast Error",
    errorMessage,
  };
};

export default castErrorHandler;
