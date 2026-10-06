const { Router } = require('express');
const productService = require('../services/productService');
const { parsePagination, parseId } = require('../lib/pagination');

const router = Router();

router.get('/', async (req, res) => {
  res.json(await productService.listProducts(parsePagination(req.query)));
});

router.get('/:id', async (req, res) => {
  res.json(await productService.getProduct(parseId(req.params.id)));
});

module.exports = router;
