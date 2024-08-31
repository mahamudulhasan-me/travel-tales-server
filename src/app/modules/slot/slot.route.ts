import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../utils/const";
import { SlotControllers } from "./slot.controller";

const router = Router();

router.get("/availability", SlotControllers.getAvailableSlots);
router.get("/", auth(USER_ROLE.admin), SlotControllers.getSlots);
router.put("/:id", auth(USER_ROLE.admin), SlotControllers.updateSlot);

export const SlotRouters = router;
