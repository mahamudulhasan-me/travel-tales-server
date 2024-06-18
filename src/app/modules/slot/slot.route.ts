import { Router } from "express";
import { SlotControllers } from "./slot.controller";

const router = Router();

router.get("/availability", SlotControllers.getAvailableSlots);

export const SlotRouters = router;
