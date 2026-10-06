const { createApp } = require('../src/app');
const db = require('../src/db/pool');

async function assertDatabaseReady() {
  try {
    const { rows } = await db.query('SELECT count(*)::int AS n FROM orders');
    if (rows[0].n === 0) throw new Error('orders table is empty');
  } catch (err) {
    throw new Error(
      `Database not ready (${err.message}). Run: docker compose up -d && npm run db:setup`,
    );
  }
}

async function startServer() {
  await assertDatabaseReady();
  const server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  return {
    baseUrl: `http://127.0.0.1:${port}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

module.exports = { startServer, assertDatabaseReady };
