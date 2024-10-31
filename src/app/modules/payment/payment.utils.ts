/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";

export const paymentInitializer = async (paymentInfo: any) => {
  const { amount, tran_id, cus_name, cus_email, cus_phone, cus_add1 } =
    paymentInfo;

  try {
    const res = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      amount,
      tran_id,
      cus_name,
      cus_email: cus_email || "N/A",
      cus_phone: cus_phone || "N/A",
      cus_add1: cus_add1 || "N/A",
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_country: "Bangladesh",
      currency: "BDT",
      success_url: `https://travel-tales-server.vercel.app/api/payment/confirmation?tran_id=${tran_id}&status=success`,

      fail_url: `https://travel-tales-server.vercel.app/api/payment/confirmation?tran_id=${tran_id}&status=failed`,

      cancel_url: config.client_base_url,
      desc: "N/A",
      type: "json",
    });
    return res.data;
  } catch (error) {
    throw new Error("Payment initiation failed");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error("Payment validation failed!");
  }
};
