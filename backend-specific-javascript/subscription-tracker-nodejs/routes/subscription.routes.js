import { Router } from "express";
import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionDetails,
  getUpcomingRenewals,
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
  .route("/upcoming-renewals")
  .get(authorize, getUpcomingRenewals);

subscriptionRouter
  .route("/:id")
  .get(authorize, getSubscriptionDetails)
  .patch(authorize, updateSubscription)
  .delete(authorize, deleteSubscription);

subscriptionRouter.route("/user/:id").get(authorize, getUserSubscriptions);

subscriptionRouter.route("/:id/cancel").patch(authorize, cancelSubscription);

export default subscriptionRouter;
