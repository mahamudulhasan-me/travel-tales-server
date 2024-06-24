import { ZodError, ZodIssue } from "zod";
import { TErrorMessage, TGenericErrorResponse } from "../interfaces/error";

const zodErrorHandler = (error: ZodError): TGenericErrorResponse => {
  const errorMessage: TErrorMessage = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessage,
  };
};

export default zodErrorHandler;
