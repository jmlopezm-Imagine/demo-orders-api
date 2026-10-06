const express = require('express');
const requestLogger = require('./lib/requestLogger');
const logger = require('./lib/logger');

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);

  app.get('/health', (req, res) => res.json({ status: 'ok' }));
  app.use('/customers', require('./routes/customers'));
  app.use('/products', require('./routes/products'));
  app.use('/orders', require('./routes/orders'));
  app.use('/reports', require('./routes/reports'));

  app.use((req, res) => res.status(404).json({ error: 'not found' }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    if (status >= 500) logger.error(err.stack || err.message);
    res.status(status).json({ error: status >= 500 ? 'internal error' : err.message });
  });

  return app;
}

module.exports = { createApp };
