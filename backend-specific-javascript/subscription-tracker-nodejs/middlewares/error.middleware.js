import CustomAPIError from "../classes/CustomAPIError.js";

const errorMiddleware = (err, req, res, next) => {
  // validation error
  if (err.name === "ValidationError") {
    const error = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: `Validation failed: ${e.kind}.${
        e.path !== "password" ? ` ${e.properties.message}` : ""
      }`,
    }));

    console.error(error);

    return res.status(400).json({ success: false, error });
  }

  // cast error
  if (err.name === "CastError") {
    const error = `${err.value} is not a valid ${err.kind} for field ${err.path}.`;

    console.error(error);

    return res.status(400).json({ success: false, error });
  }

  // duplicate keys error
  if (err.code === 11000) {
    const fields = Object.keys(err.keyPattern);

    const error = fields.map((f) => ({
      field: f,
      message: `Duplicate value for ${f}: ${err.keyValue[f]}.`,
    }));

    console.error(error);

    return res.status(400).json({ success: false, error });
  }

  // custom api error
  if (err instanceof CustomAPIError) {
    console.error(err.logMessage);
    return res
      .status(err.statusCode)
      .json({ success: false, error: err.message });
  }

  // fallback error
  console.error(err);
  res.status(500).json({ success: false, error: "Internal server error." });
};

export default errorMiddleware;
