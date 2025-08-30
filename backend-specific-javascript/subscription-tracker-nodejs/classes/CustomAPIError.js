class CustomAPIError extends Error {
  constructor(message, statusCode, logMessage) {
    super(message);
    this.statusCode = statusCode;
    this.logMessage = logMessage;
  }
}

export default CustomAPIError;
