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

La API queda en http://localhost:3000.

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
