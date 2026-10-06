const { Router } = require('express');
const customerService = require('../services/customerService');
const { parsePagination, parseId } = require('../lib/pagination');

const router = Router();

router.get('/', async (req, res) => {
  res.json(await customerService.listCustomers(parsePagination(req.query)));
});

router.get('/:id', async (req, res) => {
  res.json(await customerService.getCustomer(parseId(req.params.id)));
});

module.exports = router;
