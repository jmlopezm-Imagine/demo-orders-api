const db = require('../db/pool');
const logger = require('./logger');

// Loguea método, ruta, status, duración y número de queries por request.
function requestLogger(req, res, next) {
  const start = process.hrtime.bigint();
  const store = { count: 0 };

  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${ms.toFixed(1)}ms queries=${store.count}`,
    );
  });

  db.runTracked(store, next);
}

module.exports = requestLogger;
