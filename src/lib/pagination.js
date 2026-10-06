const { ValidationError } = require('./errors');

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

function parsePagination(query = {}) {
  const page = query.page === undefined ? 1 : Number(query.page);
  const limit = query.limit === undefined ? DEFAULT_LIMIT : Number(query.limit);

  if (!Number.isInteger(page) || page < 1) {
    throw new ValidationError('page must be a positive integer');
  }
  if (!Number.isInteger(limit) || limit < 1) {
    throw new ValidationError('limit must be a positive integer');
  }

  const safeLimit = Math.min(limit, MAX_LIMIT);
  return { page, limit: safeLimit, offset: (page - 1) * safeLimit };
}

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw new ValidationError('id must be a positive integer');
  }
  return id;
}

module.exports = { parsePagination, parseId, DEFAULT_LIMIT, MAX_LIMIT };
