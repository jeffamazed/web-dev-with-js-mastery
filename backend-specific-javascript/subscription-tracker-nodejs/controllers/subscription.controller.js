import CustomAPIError from "../classes/CustomAPIError.js";
import workflowClient from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const getAllSubscriptions = async (req, res) => {
  const subscriptions = await Subscription.find().sort({ createdAt: 1 });

  res.status(200).json({ success: true, data: subscriptions });
};

export const createSubscription = async (req, res) => {
  const subscription = await Subscription.create({
    ...req.body,
    user: req.user.id,
  });

  const { workflowRunId } = await workflowClient.trigger({
    url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
    body: {
      subscriptionId: subscription._id,
    },
    headers: {
      "content-type": "application/json",
    },
    retries: 0,
  });

  res.status(201).json({
    success: true,
    message: "Subscription created successfully.",
    data: subscription,
    workflowRunId,
  });
};

export const getSubscriptionDetails = async (req, res) => {
  const subId = req.params.id;
  const subscription = await Subscription.findById(subId);
  if (!subscription) {
    throw new CustomAPIError(
      "Subscription not found.",
      404,
      `Subscription with id ${subId} is not found.`
    );
  }

  const userId = subscription.user.toString();

  if (userId !== req.user.id) {
    throw new CustomAPIError(
      "You are not authorized to view this subscription.",
      403,
      `User with id ${userId} tries to get subscription with id ${subId}.`
    );
  }

  res.status(200).json({ success: true, data: subscription });
};

export const updateSubscription = async (req, res) => {
  const subId = req.params.id;
  const subscription = await Subscription.findById(subId);
  if (!subscription) {
    throw new CustomAPIError(
      "Subscription not found.",
      404,
      `Subscription with id ${subId} is not found.`
    );
  }

  const userId = subscription.user.toString();

  if (userId !== req.user.id) {
    throw new CustomAPIError(
      "You are not authorized to update this subscription.",
      403,
      `User with id ${req.user.id} tries to update subscription with id ${subId}.`
    );
  }

  // define updated fields

  const excludedFields = ["_id", "__v", "createdAt", "updatedAt", "user"];

  const allowedFields = Object.keys(Subscription.schema.paths).filter(
    (field) => !excludedFields.includes(field)
  );

  const update = allowedFields.reduce((acc, field) => {
    if (req.body[field] !== undefined) acc[field] = req.body[field];

    return acc;
  }, {});

  const updatedSub = await Subscription.findByIdAndUpdate(subId, update, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Subscription updated successfully.",
    data: updatedSub,
  });
};

export const deleteSubscription = async (req, res) => {
  const subId = req.params.id;
  const subscription = await Subscription.findById(subId);
  if (!subscription) {
    throw new CustomAPIError(
      "Subscription not found.",
      404,
      `Subscription with id ${subId} is not found.`
    );
  }

  const userId = subscription.user.toString();

  if (userId !== req.user.id) {
    throw new CustomAPIError(
      "You are not authorized to delete this subscription.",
      403,
      `User with id ${req.user.id} tries to delete subscription with id ${subId}.`
    );
  }

  const deletedSub = await Subscription.findByIdAndDelete(subId);

  res
    .status(200)
    .json({
      success: true,
      message: "Subscription deleted successfully.",
      data: deletedSub,
    });
};

export const getUserSubscriptions = async (req, res) => {
  // check if te user is the same as the one in the token
  if (req.user.id !== req.params.id) {
    throw new CustomAPIError(
      "You are not authorized to view the subscription details.",
      403,
      `IDs ${req.user.id} and ${req.params.id} not match for getting subscription info.`
    );
  }

  const subscriptions = await Subscription.find({ user: req.params.id });

  res.status(200).json({ success: true, data: subscriptions });
};
