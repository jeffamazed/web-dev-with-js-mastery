import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import crypto from "crypto";
import RefreshToken from "../models/refreshToken.model.js";

const generateToken = async (data) => {
  const accessToken = jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  const refreshToken = crypto.randomBytes(64).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await RefreshToken.create({
    refreshToken,
    user: data.userId,
    expiresAt,
  });

  return { accessToken, refreshToken };
};

export default generateToken;
