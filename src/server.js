const { createApp } = require('./app');
const config = require('./config');
const logger = require('./lib/logger');

createApp().listen(config.port, () => {
  logger.info(`demo-orders-api listening on http://localhost:${config.port}`);
});
