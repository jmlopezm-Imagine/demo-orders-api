const db = require('../src/db/pool');

// Borra todas las tablas (incluidas migraciones aplicadas). Luego: npm run db:setup
db.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;')
  .then(() => console.log('database reset'))
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => db.close());
