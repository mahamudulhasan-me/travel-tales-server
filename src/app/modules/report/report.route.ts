import { Router } from "express";
import auth from "../../middlewares/auth";
import { ReportController } from "./report.controller";

const router = Router();

router.get("/analytics", auth("admin"), ReportController.sevenDaysAnalytics);

router.get("/payment-report", auth("admin"), ReportController.paymentReport);

export const ReportRouters = router;
