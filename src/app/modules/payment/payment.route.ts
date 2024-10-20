import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();
router.post("/:userId", PaymentController.makePremium);
router.get("/confirmation", PaymentController.confirmationController);

export const PaymentRouters = router;
