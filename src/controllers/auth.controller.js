const authService = require("../services/auth.service");
const { generateToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");

exports.register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);

    if (!user) return next(new ApiError(401, "Invalid credentials"));

    const token = generateToken({ id: user.id, email: user.email });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
