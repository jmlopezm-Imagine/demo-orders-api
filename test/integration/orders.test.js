const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const db = require('../../src/db/pool');
const orderService = require('../../src/services/orderService');
const { startServer } = require('../../test-support/server');

let server;

before(async () => {
  server = await startServer();
});

after(async () => {
  await server.close();
  await db.close();
});

test('GET /orders returns orders with customer, items and total', async () => {
  const res = await fetch(`${server.baseUrl}/orders?limit=5`);
  assert.equal(res.status, 200);
  const body = await res.json();

  assert.equal(body.length, 5);
  assert.equal(body[0].id, 50000, 'most recent order first');
  for (const order of body) {
    assert.ok(order.customer && order.customer.email, 'order has customer');
    assert.equal(order.items.length, 3);
    const expected = order.items.reduce((s, i) => s + i.quantity * i.unitPriceCents, 0);
    assert.equal(order.totalCents, expected);
  }
});

test('GET /orders/:id returns the same shape as the list', async () => {
  const [fromList] = await (await fetch(`${server.baseUrl}/orders?limit=1`)).json();
  const res = await fetch(`${server.baseUrl}/orders/${fromList.id}`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), fromList);
});

test('GET /orders/:id returns 404 for unknown ids', async () => {
  const res = await fetch(`${server.baseUrl}/orders/999999`);
  assert.equal(res.status, 404);
});

test('listOrders runs a constant number of queries regardless of page size', async () => {
  const { queryCount } = await db.withQueryTracking(() =>
    orderService.listOrders({ limit: 50, offset: 0 }),
  );
  assert.ok(queryCount <= 3, `listOrders ran ${queryCount} queries for 50 orders (max: 3)`);
});
