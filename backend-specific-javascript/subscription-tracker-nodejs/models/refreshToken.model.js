import { model, Schema } from "mongoose";

const RefreshTokenSchema = new Schema(
  {
    refreshToken: {
      type: String,
      required: [true, "Refresh token is required."],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    expiresAt: {
      type: Date,
      required: [true, "Expires at is required."],
    },
  },
  { timestamps: true }
);

// automatic expires
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = model("RefreshToken", RefreshTokenSchema);
export default RefreshToken;
