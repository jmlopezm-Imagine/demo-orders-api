const { Router } = require('express');
const orderService = require('../services/orderService');
const { parsePagination, parseId } = require('../lib/pagination');

const router = Router();

router.get('/', async (req, res) => {
  res.json(await orderService.listOrders(parsePagination(req.query)));
});

router.get('/:id', async (req, res) => {
  res.json(await orderService.getOrder(parseId(req.params.id)));
});

module.exports = router;
