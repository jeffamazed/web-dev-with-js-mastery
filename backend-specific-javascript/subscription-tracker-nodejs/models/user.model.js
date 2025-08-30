import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required."],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Please fill a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "User password is required."],
      minLength: 6,
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
export default User;
