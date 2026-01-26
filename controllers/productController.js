
const productService = require('../services/productService');

const upload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    await productService.uploadProducts(req.file);
    res.status(200).send('Product data uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const create = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating product.');
  }
};

const get = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting products.');
  }
};

const getById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting product.');
  }
};

const update = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating product.');
  }
};

const remove = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting product.');
  }
};

module.exports = { upload, create, get, getById, update, remove };
