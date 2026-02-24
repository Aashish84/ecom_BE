const { z } = require("zod");

exports.authLoginDto = z.object({
  email: z.email(),
  password: z.string().min(6),
});

exports.authRegisterDto = z.object({
  email: z.email(),
  password: z.string().min(6),
});