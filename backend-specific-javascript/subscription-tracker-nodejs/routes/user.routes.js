import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import adminCheck from "../middlewares/admin.middleware.js";

const userRouter = Router();

userRouter.route("/").get(authorize, adminCheck, getUsers);

userRouter
  .route("/:id")
  .get(authorize, getUser)
  .patch(authorize, updateUser)
  .delete(authorize, deleteUser);

export default userRouter;
