const { Router } = require('express');
const reportService = require('../services/reportService');

const router = Router();

router.get('/top-customers', async (req, res) => {
  const limit = req.query.limit === undefined ? 10 : Number(req.query.limit);
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({ message: 'invalid limit' });
  }
  res.json(await reportService.topCustomers({ limit }));
});

module.exports = router;
