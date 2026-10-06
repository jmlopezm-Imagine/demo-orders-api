const db = require('../db/pool');
const orderRepository = require('../repositories/orderRepository');
const { NotFoundError } = require('../lib/errors');

function toItemDto(item) {
  return {
    productId: item.product_id,
    quantity: item.quantity,
    unitPriceCents: item.unit_price_cents,
  };
}

function totalOf(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPriceCents, 0);
}

async function listOrders({ limit, offset }) {
  const { rows: orders } = await db.query(
    'SELECT id, customer_id, status, created_at FROM orders ORDER BY created_at DESC, id DESC LIMIT $1 OFFSET $2',
    [limit, offset],
  );

  const result = [];
  for (const order of orders) {
    const { rows: customers } = await db.query(
      'SELECT id, name, email FROM customers WHERE id = $1',
      [order.customer_id],
    );
    const { rows: items } = await db.query(
      'SELECT product_id, quantity, unit_price_cents FROM order_items WHERE order_id = $1 ORDER BY id',
      [order.id],
    );

    const itemDtos = items.map(toItemDto);
    result.push({
      id: order.id,
      status: order.status,
      createdAt: order.created_at,
      customer: customers[0],
      items: itemDtos,
      totalCents: totalOf(itemDtos),
    });
  }
  return result;
}

async function getOrder(id) {
  const order = await orderRepository.findById(id);
  if (!order) throw new NotFoundError('order', id);

  const itemDtos = order.items.map(toItemDto);
  return {
    id: order.id,
    status: order.status,
    createdAt: order.created_at,
    customer: {
      id: order.customer_id,
      name: order.customer_name,
      email: order.customer_email,
    },
    items: itemDtos,
    totalCents: totalOf(itemDtos),
  };
}

module.exports = { listOrders, getOrder };
