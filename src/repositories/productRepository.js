const db = require('../db/pool');

async function findPage({ limit, offset }) {
  const { rows } = await db.query(
    'SELECT id, name, sku, price_cents FROM products ORDER BY id LIMIT $1 OFFSET $2',
    [limit, offset],
  );
  return rows;
}

async function findById(id) {
  const { rows } = await db.query(
    'SELECT id, name, sku, price_cents FROM products WHERE id = $1',
    [id],
  );
  return rows[0] || null;
}

module.exports = { findPage, findById };
