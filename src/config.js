module.exports = {
  port: Number(process.env.PORT) || 3100,
  databaseUrl:
    process.env.DATABASE_URL || 'postgres://orders:orders@localhost:5433/orders',
};
