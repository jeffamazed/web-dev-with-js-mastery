import CustomAPIError from "../classes/CustomAPIError.js";

const adminCheck = async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new CustomAPIError(
      "Unauthorized. You are not an admin.",
      401,
      `User with id ${req.user.id} tries to access admin routes.`
    );
  }

  next();
};

export default adminCheck;
