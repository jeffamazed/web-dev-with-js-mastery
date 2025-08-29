import { Router } from "express";

const userRouter = Router();

userRouter
  .route("/")
  .get((req, res) => res.json({ title: "GET all users" }))
  .post((req, res) => res.json({ title: "CREATE new user" }));

userRouter
  .route("/:id")
  .get((req, res) => res.json({ title: "GET user details" }))
  .put((req, res) => res.json({ title: "UPDATE user" }))
  .delete((req, res) => res.json({ title: "Delete user" }));

export default userRouter;
