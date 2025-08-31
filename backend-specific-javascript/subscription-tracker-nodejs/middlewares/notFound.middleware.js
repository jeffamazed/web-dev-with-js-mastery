const notFoundMiddleware = (req, res) =>
  res.status(404).json({ success: false, error: "Resource not found." });

export default notFoundMiddleware;
