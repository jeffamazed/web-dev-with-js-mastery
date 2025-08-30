import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(getUsers)
  .post((req, res) => res.json({ title: "CREATE new user" }));

userRouter
  .route("/:id")
  .get(authorize, getUser)
  .put((req, res) => res.json({ title: "UPDATE user" }))
  .delete((req, res) => res.json({ title: "Delete user" }));

export default userRouter;
