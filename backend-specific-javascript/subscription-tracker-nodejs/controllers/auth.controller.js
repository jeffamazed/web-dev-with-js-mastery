import CustomAPIError from "../classes/CustomAPIError.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  // check if a user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomAPIError(
      "User already exists.",
      409,
      `User with id ${existingUser._id} already exists.`
    );
  }

  const newUser = await User.create({ name, email, password, role });
  const accessToken = generateToken({
    userId: newUser._id,
    role: newUser.role,
  });

  res.status(201).json({
    success: true,
    message: "User created successfully.",
    data: {
      user: newUser,
      accessToken,
    },
  });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  // check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomAPIError(
      "User not found.",
      404,
      `User with email ${email} not found.`
    );
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new CustomAPIError(
      "Invalid password.",
      401,
      `Invalid password for email ${email}.`
    );
  }

  const accessToken = generateToken({ userId: user._id, role: user.role });

  res.status(200).json({
    success: true,
    message: "User signed in successfully.",
    data: {
      user,
      accessToken,
    },
  });
};

export const signOut = async (req, res) => {};
