const { verifyToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return next(new ApiError(401, "Unauthorized"));

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(new ApiError(401, "Invalid token"));
  }
};
