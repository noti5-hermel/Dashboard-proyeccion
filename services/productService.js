
const productModel = require('../models/productModel');
const uploadService = require('./uploadService');

const uploadProducts = async (file) => {
  const data = uploadService.parseExcel(file);
  if (data.length === 0) {
    throw new Error('Excel file is empty or has no data.');
  }
  return await productModel.insert(data);
};

const createProduct = async (product) => {
  return await productModel.create(product);
};

const getProducts = async () => {
  return await productModel.get();
};

const updateProduct = async (id, product) => {
  return await productModel.update(id, product);
};

const deleteProduct = async (id) => {
  return await productModel.remove(id);
};

module.exports = {
  uploadProducts,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
