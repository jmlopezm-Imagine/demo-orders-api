const { test } = require('node:test');
const assert = require('node:assert/strict');
const { rankCustomersByRevenue } = require('../../src/services/reportService');

function buildDataset({ customers, orders }) {
  const customerList = [];
  for (let id = 1; id <= customers; id += 1) {
    customerList.push({ id, name: `Cliente ${id}`, email: `c${id}@example.com` });
  }
  const orderTotals = [];
  for (let id = 1; id <= orders; id += 1) {
    orderTotals.push({
      id,
      customer_id: 1 + ((id * 7919) % customers),
      total_cents: 1000 + ((id * 104729) % 90000),
    });
  }
  return { customerList, orderTotals };
}

test('ranks customers by revenue, ties broken by id', () => {
  const customers = [
    { id: 1, name: 'Ana', email: 'ana@example.com' },
    { id: 2, name: 'Beto', email: 'beto@example.com' },
    { id: 3, name: 'Caro', email: 'caro@example.com' },
  ];
  const orderTotals = [
    { id: 10, customer_id: 2, total_cents: 500 },
    { id: 11, customer_id: 1, total_cents: 300 },
    { id: 12, customer_id: 3, total_cents: 700 },
    { id: 13, customer_id: 1, total_cents: 400 },
    { id: 14, customer_id: 99, total_cents: 9999 },
  ];

  assert.deepEqual(rankCustomersByRevenue(orderTotals, customers, 2), [
    { customerId: 1, name: 'Ana', email: 'ana@example.com', orders: 2, revenueCents: 700 },
    { customerId: 3, name: 'Caro', email: 'caro@example.com', orders: 1, revenueCents: 700 },
  ]);
});

test('returns an empty ranking when there are no orders', () => {
  assert.deepEqual(rankCustomersByRevenue([], [{ id: 1, name: 'A', email: 'a@x' }], 5), []);
});

test('ranks 50k orders of 5k customers in under 250ms', () => {
  const { customerList, orderTotals } = buildDataset({ customers: 5000, orders: 50000 });

  const start = process.hrtime.bigint();
  const ranking = rankCustomersByRevenue(orderTotals, customerList, 10);
  const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;

  assert.equal(ranking.length, 10);
  assert.ok(elapsedMs < 250, `rankCustomersByRevenue took ${elapsedMs.toFixed(0)}ms (budget: 250ms)`);
});
