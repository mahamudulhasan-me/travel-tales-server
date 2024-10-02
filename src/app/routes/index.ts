import { Router } from "express";
import { AuthRouters } from "../modules/auth/auth.route";
import { PaymentRouters } from "../modules/payment/payment.route";
import { UserRouters } from "../modules/user/user.route";

const router = Router();
const moduleRouters = [
  {
    path: "/auth",
    route: AuthRouters,
  },

  {
    path: "/users",
    route: UserRouters,
  },
  {
    path: "/payment",
    route: PaymentRouters,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
