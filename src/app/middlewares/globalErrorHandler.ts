import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";

import AppError from "../errors/AppError";
import castErrorHandler from "../errors/castErrorHandler";
import duplicateKeyErrorHandler from "../errors/duplicateKeyErrorHandler";
import mongooseValidationErrorHandler from "../errors/mongooseValidationErrorHandler";
import zodErrorHandler from "../errors/zodErrorHandler";
import { TErrorMessage } from "../interfaces/error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
  // error pattern
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: TErrorMessage = [
    { path: "", message: "Something went wrong!" },
  ];

  if (error instanceof ZodError) {
    const errRes = zodErrorHandler(error);

    statusCode = errRes.statusCode;
    message = errRes.message;
    errorMessages = errRes.errorMessage;
  } else if (error?.name === "ValidationError") {
    const errRes = mongooseValidationErrorHandler(error);

    statusCode = errRes.statusCode;
    message = errRes.message;
    errorMessages = errRes.errorMessage;
  } else if (error?.name === "CastError") {
    const errRes = castErrorHandler(error);

    statusCode = errRes.statusCode;
    message = errRes.message;
    errorMessages = errRes.errorMessage;
  } else if (error?.code === 11000) {
    const errRes = duplicateKeyErrorHandler(error);

    statusCode = errRes.statusCode;
    message = errRes.message;
    errorMessages = errRes.errorMessage;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;

    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages,
    // error,
    stack: config.node_env === "development" ? error?.stack : null,
  });
};

export default globalErrorHandler;
