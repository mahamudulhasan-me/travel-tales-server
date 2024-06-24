import { TErrorMessage, TGenericErrorResponse } from "../interfaces/error";

const duplicateKeyErrorHandler = (error: any): TGenericErrorResponse => {
  const errorResponse = error?.errorResponse;

  const path = Object.keys(errorResponse.keyValue)[
    Object.keys(errorResponse.keyValue).length - 1
  ];

  const message = errorResponse.errmsg;

  const errorMessage: TErrorMessage = [
    {
      path: path,
      message: message,
    },
  ];
  return {
    statusCode: 400,
    message: "Duplicate Entry",
    errorMessage,
  };
};

export default duplicateKeyErrorHandler;
