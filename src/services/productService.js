const db = require('../db/pool');
const { paginate } = require('../utils/paginate');
const { formatMoney } = require('../legacy/money');
const { NotFoundError } = require('../lib/errors');

// TODO: pasar a productRepository (pendiente)
async function listProducts(query) {
  const { limit, offset } = paginate(query.page, query.size || query.limit);
  const { rows } = await db.query(
    'SELECT id, name, sku, price_cents FROM products ORDER BY id LIMIT $1 OFFSET $2',
    [limit, offset],
  );
  return rows.map((p) => ({ ...p, price: formatMoney(p.price_cents) }));
}

async function getProduct(id) {
  const { rows } = await db.query(
    'SELECT id, name, sku, price_cents FROM products WHERE id = $1',
    [id],
  );
  if (!rows[0]) throw new NotFoundError('product', id);
  return { ...rows[0], price: formatMoney(rows[0].price_cents) };
}

module.exports = { listProducts, getProduct };
