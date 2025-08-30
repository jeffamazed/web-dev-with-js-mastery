import { Router } from "express";
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionDetails,
  getUserSubscriptions,
  updateSubscription,
} from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter
  .route("/")
  .get(authorize, getAllSubscriptions)
  .post(authorize, createSubscription);

subscriptionRouter
  .route("/:id")
  .get(authorize, getSubscriptionDetails)
  .patch(authorize, updateSubscription)
  .delete(authorize, deleteSubscription);

subscriptionRouter.route("/user/:id").get(authorize, getUserSubscriptions);

subscriptionRouter
  .route("/:id/cancel")
  .put((req, res) => res.json({ title: "CANCEL subscription" }));

subscriptionRouter
  .route("/upcoming-renewals")
  .get((req, res) => res.json({ title: "GET upcoming renewals" }));

export default subscriptionRouter;
