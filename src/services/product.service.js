const prisma = require("./prisma");
const ApiError = require("../utils/ApiError");

exports.create = (data) => {
  return prisma.product.create({ data });
};

exports.getAll = () => {
  return prisma.product.findMany();
};

exports.getById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

exports.update = async (id, data) => {
  await exports.getById(id); // existence check
  return prisma.product.update({
    where: { id: Number(id) },
    data,
  });
};

exports.remove = async (id) => {
  await exports.getById(id); // existence check
  return prisma.product.delete({
    where: { id: Number(id) },
  });
};
