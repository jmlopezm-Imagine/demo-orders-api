// Paginación (primera versión).
function paginate(page = 1, size = 25) {
  const p = Number(page) || 1;
  const s = Number(size) || 25;
  return { limit: s, offset: (p - 1) * s };
}

module.exports = { paginate };
