const { AsyncLocalStorage } = require('node:async_hooks');
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({ connectionString: config.databaseUrl, max: 10 });

// Cuenta las queries ejecutadas dentro de un contexto (una request o un test).
const tracker = new AsyncLocalStorage();

function query(text, params) {
  const store = tracker.getStore();
  if (store) store.count += 1;
  return pool.query(text, params);
}

function runTracked(store, fn) {
  return tracker.run(store, fn);
}

async function withQueryTracking(fn) {
  const store = { count: 0 };
  const result = await tracker.run(store, fn);
  return { result, queryCount: store.count };
}

function close() {
  return pool.end();
}

module.exports = { query, runTracked, withQueryTracking, close, pool };
