import { sign } from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

const generateToken = (data) => {
  return sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export default generateToken;
