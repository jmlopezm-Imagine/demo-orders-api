const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const db = require('../../src/db/pool');
const { startServer } = require('../../test-support/server');

let server;

before(async () => {
  server = await startServer();
});

after(async () => {
  await server.close();
  await db.close();
});

test('GET /customers returns a page of customers', async () => {
  const res = await fetch(`${server.baseUrl}/customers?page=2&limit=5`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.length, 5);
  assert.equal(body[0].id, 6);
});

test('GET /customers/:id returns one customer', async () => {
  const res = await fetch(`${server.baseUrl}/customers/1`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.email, 'cliente1@example.com');
});

test('GET /customers/:id returns 404 for unknown ids', async () => {
  const res = await fetch(`${server.baseUrl}/customers/999999`);
  assert.equal(res.status, 404);
});

test('GET /customers rejects invalid pagination', async () => {
  const res = await fetch(`${server.baseUrl}/customers?page=0`);
  assert.equal(res.status, 400);
});
