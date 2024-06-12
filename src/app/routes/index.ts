import { Router } from "express";

const router = Router();
const moduleRouters = [
  {
    path: "/",
    route: "",
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
