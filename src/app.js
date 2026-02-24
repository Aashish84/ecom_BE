const express = require("express");
const errorHandler = require("./middlewares/error.handler");
const ApiError = require("./utils/ApiError");

// routes
const testRoutes = require("./routes/test.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");


const app = express();

app.use(express.json());

// static test route to check if server is working fine
app.use("/api/test", testRoutes);


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

/**
 * here next function has error as parameter, so it will directly call error handling middleware
 * if none of the above routes match, this middleware will be executed 
 */
app.use((req, res, next) => {
	next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`));
});

/**
 * Global error handler
 *
 * if function has 4 parameters, it is considered as error handling middleware in express
 * if function has 3 parameters, it is considered as normal middleware in express
 */
app.use(errorHandler);

module.exports = app;