const db = require('../db/pool');

async function findPage({ limit, offset }) {
  const { rows } = await db.query(
    'SELECT id, name, email, city, created_at FROM customers ORDER BY id LIMIT $1 OFFSET $2',
    [limit, offset],
  );
  return rows;
}

async function findById(id) {
  const { rows } = await db.query(
    'SELECT id, name, email, city, created_at FROM customers WHERE id = $1',
    [id],
  );
  return rows[0] || null;
}

async function findAll() {
  const { rows } = await db.query('SELECT id, name, email FROM customers ORDER BY id');
  return rows;
}

module.exports = { findPage, findById, findAll };
