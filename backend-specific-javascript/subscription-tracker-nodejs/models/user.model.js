import { model, Schema } from "mongoose";
import { compare, genSalt, hash } from "bcryptjs";

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
      index: true,
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
      minLength: 8,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return compare(candidatePassword, this.password);
};

// for hiding sensitive info such as password when querying
UserSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id;
    delete returnedObj._id;
    delete returnedObj.password;
    delete returnedObj.__v;
    return returnedObj;
  },
});

const User = model("User", UserSchema);
export default User;
