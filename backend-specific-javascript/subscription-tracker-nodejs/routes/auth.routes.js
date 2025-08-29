import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => res.json({ title: "Sign up" }));
authRouter.post("/sign-in", (req, res) => res.json({ title: "Sign in" }));
authRouter.post("/sign-out", (req, res) => res.json({ title: "Sign out" }));

export default authRouter;
