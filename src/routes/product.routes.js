const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const validate = require("../middlewares/validate");
const {
  createProductDto,
  updateProductDto,
} = require("../validations/product.validations");

const auth = require("../middlewares/auth.middleware");

// All routes require authentication
router.use(auth);

router.post("/", validate(createProductDto), controller.createProduct);
router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);
router.put("/:id", validate(updateProductDto), controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
