import { Router } from "express";
import {
  refresh,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/refresh", refresh);
authRouter.post("/sign-out", signOut);

export default authRouter;
