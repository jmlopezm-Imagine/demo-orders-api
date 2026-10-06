const { Router } = require('express');
const reportService = require('../services/reportService');
const { ValidationError } = require('../lib/errors');

const router = Router();

router.get('/top-customers', async (req, res) => {
  const limit = req.query.limit === undefined ? 10 : Number(req.query.limit);
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new ValidationError('limit must be an integer between 1 and 100');
  }
  res.json(await reportService.topCustomers({ limit }));
});

module.exports = router;
