const db = require('../db/pool');
const { toCamel } = require('../lib/case');

async function findPage({ limit, offset }) {
  const { rows } = await db.query(
    'SELECT id, name, email, city, created_at FROM customers ORDER BY id LIMIT $1 OFFSET $2',
    [limit, offset],
  );
  return rows.map(toCamel);
}

async function findById(id) {
  const { rows } = await db.query(
    'SELECT id, name, email, city, created_at FROM customers WHERE id = $1',
    [id],
  );
  return toCamel(rows[0]) || null;
}

async function fetchAll() {
  const { rows } = await db.query('select id, name, email from customers order by id');
  return rows.map(toCamel);
}

module.exports = { findPage, findById, fetchAll };
