import CustomAPIError from "../classes/CustomAPIError.js";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({ success: true, data: users });
};

export const getUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomAPIError(
      "User not found.",
      404,
      `User with id ${userId} is not found.`
    );
  }

  res.status(200).json({ success: true, data: user });
};
