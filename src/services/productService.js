const productRepository = require('../repositories/productRepository');
const { NotFoundError } = require('../lib/errors');

async function listProducts(pagination) {
  return productRepository.findPage(pagination);
}

async function getProduct(id) {
  const product = await productRepository.findById(id);
  if (!product) throw new NotFoundError('product', id);
  return product;
}

module.exports = { listProducts, getProduct };
