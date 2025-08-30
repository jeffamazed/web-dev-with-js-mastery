import CustomAPIError from "../classes/CustomAPIError.js";
import User from "../models/user.model.js";
import decodeToken from "../utils/decodeToken.js";

const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization?.trim();

  let token;
  if (authHeader) {
    const parts = authHeader.split(/\s+/);

    if (parts[0].toLowerCase() === "bearer" && parts.length === 2) {
      token = parts[1];
    }
  }

  if (!token) {
    throw new CustomAPIError(
      "Unauthorized.",
      401,
      `Unauthorized user from ${req.ip} - Missing or malformed token.`
    );
  }

  const decoded = decodeToken(token);

  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new CustomAPIError(
      "Unauthorized.",
      401,
      `User with userId ${decoded.userId} is not found.`
    );
  }

  req.user = user;
  next();
};

export default authorize;
