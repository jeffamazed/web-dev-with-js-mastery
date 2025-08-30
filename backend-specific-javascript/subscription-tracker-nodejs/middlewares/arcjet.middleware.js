import CustomAPIError from "../classes/CustomAPIError.js";
import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  const decision = await aj.protect(req, { requested: 1 });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new CustomAPIError(
        "Rate limit exceeded.",
        429,
        `Rate limit exceeded for ip ${req.ip} hitting endpoint ${req.url}.`
      );
    }

    if (decision.reason.isBot()) {
      throw new CustomAPIError(
        "Bot detected.",
        403,
        `Bot detected from ip ${req.ip} hitting endpoint ${req.url}.`
      );
    }

    throw new CustomAPIError(
      "Access denied.",
      403,
      `Access denied for ip ${req.ip} hitting endpoint ${req.url}.`
    );
  }

  next();
};

export default arcjetMiddleware;
