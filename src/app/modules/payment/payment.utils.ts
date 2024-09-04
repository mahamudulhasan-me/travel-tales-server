import axios from "axios";

export const paymentInitializer = async () => {
  const res = await axios.post(" https://sandbox.aamarpay.com/jsonpost.php", {
    store_id: "aamarpaytest",
    signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
    cus_name: "Mahamudul Hasan",
    cus_email: "imtiaz.akil@softbd.com",
    cus_phone: "01870762472",
    cus_add1: "53, Gausul Azam Road, Sector-14, Dhaka, Bangladesh",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    amount: "10.00",
    tran_id: "rerererer",
    currency: "BDT",
    success_url: "http://localhost:5173/payment/success",
    fail_url: "https://example.com/fail.php",
    cancel_url: "https://example.com/cancel.php",
    desc: "Lend Money",
    type: "json",
  });
  return res.data;
};
