const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error(err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal server error",
    errors: err.errors || null,
  });
};
