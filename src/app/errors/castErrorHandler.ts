import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error";

const castErrorHandler = (
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  return {
    statusCode: 400,
    message: "Invalid Unique Identifier",
    errorSources,
  };
};

export default castErrorHandler;
