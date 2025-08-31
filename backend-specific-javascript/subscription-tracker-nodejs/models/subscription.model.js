import { model, Schema } from "mongoose";

const SubscriptionSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required."],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required."],
      min: [0, "Price must be greater than 0."],
    },
    currency: {
      type: String,
      enum: [
        "USD",
        "EUR",
        "GBP",
        "AUD",
        "SGD",
        "JPY",
        "CAD",
        "CHF",
        "CNY",
        "NZD",
        "INR",
        "KRW",
        "MXN",
        "BRL",
        "ZAR",
      ],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: [true, "Subscription frequency is required."],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: [true, "Subscription category is required."],
    },
    paymentMethod: {
      type: String,
      required: [true, "Subscription payment method is required."],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "canceled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription start date is required."],
      validate: {
        validator: (v) => v <= new Date(),
        message: "Start date must be in the past.",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return v > this.startDate;
        },
        message: "Renewal date must be after the start date.",
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Subscription user is required."],
      index: true,
    },
  },
  { timestamps: true }
);

SubscriptionSchema.pre("save", function (next) {
  // Auto calculate the renewal date if missing
  if (!this.renewalDate) {
    const renewalDate = new Date(this.startDate);

    switch (this.frequency) {
      case "daily":
        renewalDate.setDate(renewalDate.getDate() + 1);
        break;
      case "weekly":
        renewalDate.setDate(renewalDate.getDate() + 7);
        break;
      case "monthly":
        renewalDate.setMonth(renewalDate.getMonth() + 1);
        break;
      case "yearly":
        renewalDate.setFullYear(renewalDate.getFullYear() + 1);
        break;
      default:
        break;
    }

    this.renewalDate = renewalDate;
  }

  // Auto update the status if renewal date has passed
  if (this.renewalDate < new Date() && this.status === "active") {
    this.status = "expired";
  }

  next();
});

SubscriptionSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id;
    delete returnedObj._id;
    delete returnedObj.__v;
    return returnedObj;
  },
});

/** @type {import('mongoose').Model<any, {}, {}, {}, any>} */
const Subscription = model("Subscription", SubscriptionSchema);

export default Subscription;
