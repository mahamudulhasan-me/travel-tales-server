import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();
router.post("/", PaymentController.makePremium);
router.post("/confirmation", PaymentController.confirmationController);

export const PaymentRouters = router;
