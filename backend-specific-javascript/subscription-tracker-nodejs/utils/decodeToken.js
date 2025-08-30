import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

const decodeToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export default decodeToken;
