import asyncHandler from "../../utils/asyncHandler";
import { PaymentServices } from "./payment.service";

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
};
