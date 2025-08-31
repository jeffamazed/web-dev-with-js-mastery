import { createTransport } from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";

export const accountEmail = "jeffry1408.job@gmail.com";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD,
  },
});

export default transporter;
