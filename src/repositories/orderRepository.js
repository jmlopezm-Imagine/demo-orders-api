const db = require('../db/pool');

async function findById(id) {
  const { rows } = await db.query(
    `SELECT o.id, o.status, o.created_at,
            c.id AS customer_id, c.name AS customer_name, c.email AS customer_email
       FROM orders o
       JOIN customers c ON c.id = o.customer_id
      WHERE o.id = $1`,
    [id],
  );
  if (rows.length === 0) return null;

  const { rows: items } = await db.query(
    'SELECT product_id, quantity, unit_price_cents FROM order_items WHERE order_id = $1 ORDER BY id',
    [id],
  );
  return { ...rows[0], items };
}

// Total facturado por orden, para reportes.
async function findTotals() {
  const { rows } = await db.query(
    `SELECT o.id, o.customer_id,
            SUM(i.quantity * i.unit_price_cents)::int AS total_cents
       FROM orders o
       JOIN order_items i ON i.order_id = o.id
      WHERE o.status <> 'cancelled'
      GROUP BY o.id`,
  );
  return rows;
}

module.exports = { findById, findTotals };
