import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

const generateToken = (data) => {
  return jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export default generateToken;
