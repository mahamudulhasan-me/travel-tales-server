import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error";

const mongooseValidationErrorHandler = (
  error: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(error.errors).map(
    (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: err?.path,
        message: err?.message,
      };
    }
  );
  return {
    statusCode: 400,
    message: error.message,
    errorSources,
  };
};

export default mongooseValidationErrorHandler;
