const ApiError = require("../utils/ApiError");


/**
 * if schema is not zod function then schema.safeParse will throw error : "schema.safeParse is not a function" 
 * so we just hope i am passing zod schema which has safeParse function, i can have ts make sure schema is of type zod schema like :
 * schema: AnyZodObject where AnyZodObject is imported from zod
 */
module.exports = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return next(
      new ApiError(
        400,
        "Validation failed",
        result.error.flatten().fieldErrors
      )
    );
  }

  req.body = result.data;
  next();
};
