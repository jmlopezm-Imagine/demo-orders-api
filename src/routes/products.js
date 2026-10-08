const { Router } = require('express');
const productService = require('../services/productService');
const { parseId } = require('../lib/pagination');

const router = Router();

router.get('/', (req, res, next) => {
  productService
    .listProducts(req.query)
    .then((products) => res.json(products))
    .catch(next);
});

router.get('/:id', async (req, res) => {
  res.json(await productService.getProduct(parseId(req.params.id)));
});

module.exports = router;
