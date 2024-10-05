import { Router } from "express";
import { AuthRouters } from "../modules/auth/auth.route";
import { CommentRouters } from "../modules/comment/comment.route";
import { PostRouters } from "../modules/post/post.route";
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
    path: "/post",
    route: PostRouters,
  },
  {
    path: "/comment",
    route: CommentRouters,
  },
  // {
  //   path: "/payment",
  //   route: PaymentRouters,
  // },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
