const { z } = require("zod");

exports.createProductDto = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string().optional(),
});

exports.updateProductDto = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  description: z.string().optional(),
});
