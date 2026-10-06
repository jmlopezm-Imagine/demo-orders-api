const db = require('../src/db/pool');

// Datos deterministas: mismas cifras en cada máquina.
const SEED_SQL = `
TRUNCATE order_items, orders, products, customers RESTART IDENTITY CASCADE;

INSERT INTO customers (name, email, city)
SELECT 'Cliente ' || g,
       'cliente' || g || '@example.com',
       (ARRAY['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga'])[1 + g % 5]
  FROM generate_series(1, 5000) g;

INSERT INTO products (name, sku, price_cents)
SELECT 'Producto ' || g, 'SKU-' || lpad(g::text, 5, '0'), 1000 + (g * 137) % 49000
  FROM generate_series(1, 300) g;

INSERT INTO orders (customer_id, status, created_at)
SELECT 1 + (g * 7919) % 5000,
       (ARRAY['pending', 'paid', 'shipped', 'cancelled'])[1 + g % 4],
       TIMESTAMPTZ '2026-01-01 00:00:00+00' + g * INTERVAL '1 minute'
  FROM generate_series(1, 50000) g;

INSERT INTO order_items (order_id, product_id, quantity, unit_price_cents)
SELECT o.id, p.id, 1 + (o.id + i) % 5, p.price_cents
  FROM orders o
 CROSS JOIN generate_series(1, 3) i
  JOIN products p ON p.id = 1 + (o.id * 31 + i * 17) % 300;

ANALYZE;
`;

async function main() {
  await db.query(SEED_SQL);
  const { rows } = await db.query(
    `SELECT (SELECT count(*) FROM customers) AS customers,
            (SELECT count(*) FROM products) AS products,
            (SELECT count(*) FROM orders) AS orders,
            (SELECT count(*) FROM order_items) AS order_items`,
  );
  console.log('seeded', rows[0]);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => db.close());
