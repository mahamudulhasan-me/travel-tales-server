import { readFileSync } from "fs";
import { join } from "path";
import { BookingModel } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyPaymentRes = await verifyPayment(transactionId);

  let template;

  if (verifyPaymentRes && verifyPaymentRes.pay_status === "Successful") {
    await BookingModel.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "paid" },
      { new: true }
    );
    const htmlFilePath = join(
      __dirname,
      "../../../app/view/PaymentSuccess.html"
    );
    template = readFileSync(htmlFilePath, "utf-8");
  } else {
    const htmlFilePath = join(
      __dirname,
      "../../../app/view/PaymentFailed.html"
    );
    template = readFileSync(htmlFilePath, "utf-8");
  }

  // Replace placeholder with actual transaction ID
  template = template.replace("{{tran_id}}", transactionId);

  return template;
};

export const PaymentServices = {
  confirmationService,
};
