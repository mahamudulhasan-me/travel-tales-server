import { Router } from "express";
import { AuthRouters } from "../modules/auth/auth.route";

const router = Router();
const moduleRouters = [
  {
    path: "/route",
    route: AuthRouters,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
