import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

const makePremium = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const result = await PaymentServices.makePremium(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Premium account created successfully",
    data: result,
  });
});

const confirmationController = asyncHandler(async (req, res) => {
  const { tran_id, status } = req.query;

  const result = await PaymentServices.confirmationService(
    tran_id as string,
    status as string
  );

  res.send(result);
});
export const PaymentController = {
  confirmationController,
  makePremium,
};
