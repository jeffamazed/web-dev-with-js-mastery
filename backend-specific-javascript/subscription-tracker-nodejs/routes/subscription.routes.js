import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter
  .route("/")
  .get((req, res) => res.json({ title: "GET all subscription" }))
  .post((req, res) => res.json({ title: "CREATE subscription" }));

subscriptionRouter
  .route("/:id")
  .get((req, res) => res.json({ title: "GET subscription details" }))
  .put((req, res) => res.json({ title: "UPDATE subscription" }))
  .delete((req, res) => res.json({ title: "DELETE subscription" }));

subscriptionRouter
  .route("/user/:id")
  .get((req, res) => res.json({ title: "GET all user subscriptions" }));

subscriptionRouter
  .route("/:id/cancel")
  .put((req, res) => res.json({ title: "CANCEL subscription" }));

subscriptionRouter
  .route("/upcoming-renewals")
  .get((req, res) => res.json({ title: "GET upcoming renewals" }));

export default subscriptionRouter;
