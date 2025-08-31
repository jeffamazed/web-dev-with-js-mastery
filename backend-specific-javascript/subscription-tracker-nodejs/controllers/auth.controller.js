import CustomAPIError from "../classes/CustomAPIError.js";
import RefreshToken from "../models/refreshToken.model.js";
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
  const { accessToken, refreshToken } = await generateToken({
    userId: newUser._id,
    role: newUser.role,
  });

  res.status(201).json({
    success: true,
    message: "User created successfully.",
    data: {
      user: newUser,
      accessToken,
      refreshToken,
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

  const { accessToken, refreshToken } = await generateToken({
    userId: user._id,
    role: user.role,
  });

  res.status(200).json({
    success: true,
    message: "User signed in successfully.",
    data: {
      user,
      accessToken,
      refreshToken,
    },
  });
};

export const refresh = async (req, res) => {
  if (!req.body?.refreshToken) {
    throw new CustomAPIError(
      "Missing refresh token.",
      400,
      "Missing refresh token at refresh."
    );
  }

  const { refreshToken } = req.body;

  const storedToken = await RefreshToken.findOne({
    refreshToken,
  });

  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new CustomAPIError(
      "Invalid or expired refresh token.",
      401,
      `Invalid or expired refresh token ${refreshToken}.`
    );
  }

  // check if user exists given refreshToken
  const user = await User.findById(storedToken.user);
  if (!user) {
    throw new CustomAPIError(
      "Invalid or expired refresh token.",
      401,
      `Invalid or expired refresh token ${refreshToken}`
    );
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    await generateToken({
      userId: user._id,
      role: user.role,
    });

  // delete the old refresh token
  await RefreshToken.deleteOne({ _id: storedToken._id });

  res.status(200).json({
    success: true,
    message: "Tokens generated successfully.",
    data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
  });
};

export const signOut = async (req, res) => {
  if (!req.body?.refreshToken) {
    throw new CustomAPIError(
      "Missing refresh token.",
      400,
      "Missing refresh token at sign out."
    );
  }

  const { refreshToken } = req.body;

  const result = await RefreshToken.deleteOne({
    refreshToken: refreshToken,
  });
  if (result.deletedCount === 0) {
    throw new CustomAPIError(
      "Refresh token not found or already invalidated.",
      401,
      `Attempted to delete non-existent refresh token ${refreshToken}.`
    );
  }

  res.status(200).json({ success: true, message: "Signed out successfully." });
};
