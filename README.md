# demo-orders-api

API REST de clientes, productos y órdenes.

## Requisitos

- Node.js 20+
- Docker

## Cómo correrlo

```bash
npm install
docker compose up -d
npm run db:setup
npm start
```

La API queda en http://localhost:3100 y Postgres en el puerto 5433, para no chocar con servicios locales en 3000/5432. Se cambian con `PORT` y `DATABASE_URL` (ver `.env.example`).

## Endpoints

- `GET /health`
- `GET /customers`, `GET /customers/:id`
- `GET /products`, `GET /products/:id`
- `GET /orders`, `GET /orders/:id`
- `GET /reports/top-customers`

## Tests

```bash
npm test
```

## Notas de desarrollo

- El esquema de la base de datos está en `db/schema.sql`.
- Para cambios de esquema: actualiza `db/schema.sql` y corre `npm run migrate`.
- Los precios se muestran con el helper de `src/legacy/money.js`.
