const { test } = require('node:test');
const assert = require('node:assert/strict');
const { parsePagination, parseId, MAX_LIMIT } = require('../../src/lib/pagination');

test('uses defaults when no params are given', () => {
  assert.deepEqual(parsePagination({}), { page: 1, limit: 20, offset: 0 });
});

test('computes offset from page and limit', () => {
  assert.deepEqual(parsePagination({ page: '3', limit: '10' }), {
    page: 3,
    limit: 10,
    offset: 20,
  });
});

test('caps limit at MAX_LIMIT', () => {
  assert.equal(parsePagination({ limit: '1000' }).limit, MAX_LIMIT);
});

test('rejects invalid values', () => {
  assert.throws(() => parsePagination({ page: '0' }), /page/);
  assert.throws(() => parsePagination({ limit: 'abc' }), /limit/);
  assert.throws(() => parseId('-1'), /id/);
});
