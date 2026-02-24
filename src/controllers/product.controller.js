const productService = require("../services/product.service");

exports.createProduct = async (req, res, next) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json({ success: true, statusCode: 201, data: product });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAll();
    res.status(200).json({ success: true, statusCode: 200, data: products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productService.getById(req.params.id);
    res.status(200).json({ success: true, statusCode: 200, data: product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    res.status(200).json({ success: true, statusCode: 200, data: product });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await productService.remove(req.params.id);
    res
      .status(200)
      .json({ success: true, statusCode: 200, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
