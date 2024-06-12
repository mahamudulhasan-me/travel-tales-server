import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error";

const zodErrorHandler = (error: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode: 400,
    message: "Validator Error",
    errorSources,
  };
};

export default zodErrorHandler;
