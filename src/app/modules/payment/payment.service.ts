import { readFileSync } from "fs";
import path from "path";
import { verifyPayment } from "./payment.utils";
import { BookingModel } from "../booking/booking.model";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyPaymentRes = await verifyPayment(transactionId);

  let templatePath;

  if (verifyPaymentRes && verifyPaymentRes.pay_status === "Successful") {
    await BookingModel.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "paid" },
      { new: true }
    );
    templatePath = path.join(process.cwd(), "public/view/PaymentSuccess.html");
  } else {
    templatePath = path.join(process.cwd(), "public/view/PaymentFailed.html");
  }

  const template = readFileSync(templatePath, "utf-8");

  // Replace placeholder with actual transaction ID
  return template.replace("{{tran_id}}", transactionId || "failed");
};

export const PaymentServices = {
  confirmationService,
};
