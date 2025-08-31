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

export const updateUser = async (req, res) => {
  const userId = req.params.id;

  // check if the ids don't match
  if (userId !== req.user.id) {
    throw new CustomAPIError(
      "You are not authorized to update this user.",
      403,
      `User with id ${req.user.id} tries to update user with id ${userId}`
    );
  }

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully.",
    data: updatedUser,
  });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  // check if the ids don't match
  if (userId !== req.user.id) {
    throw new CustomAPIError(
      "You are not authorized to delete this user.",
      403,
      `User with id ${req.user.id} tries to delete user with id ${userId}`
    );
  }

  const deletedUser = await User.findByIdAndDelete(userId);

  res
    .status(200)
    .json({
      success: true,
      messaeg: "User deleted successfully.",
      data: deletedUser,
    });
};
