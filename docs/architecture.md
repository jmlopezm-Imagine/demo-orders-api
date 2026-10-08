# Arquitectura

> Derivado de `.engineering/blueprint.yaml`. Si este documento y el blueprint no coinciden, manda el blueprint.

## Vista general

```
HTTP ──▶ routes/ ──▶ services/ ──▶ repositories/ ──▶ db/pool.js ──▶ Postgres
           │             │                │
      validación    lógica de        único lugar
      de params     negocio + DTOs   con SQL
```

| Capa | Carpeta | Responsabilidad | Puede depender de |
|---|---|---|---|
| Routes | `src/routes/` | HTTP, parseo y validación de parámetros | services, lib |
| Services | `src/services/` | Lógica de negocio, armado de DTOs | repositories, lib |
| Repositories | `src/repositories/` | SQL y acceso a datos | db |
| DB | `src/db/` | Pool de conexiones, conteo de queries | — |
| Lib | `src/lib/` | Errores, paginación, logging | — |

## Modelo de datos

```
customers 1 ──── * orders 1 ──── * order_items * ──── 1 products
```

- `customers(id, name, email UNIQUE, city, created_at)`
- `products(id, name, sku UNIQUE, price_cents)`
- `orders(id, customer_id → customers, status, created_at)`
- `order_items(id, order_id → orders, product_id → products, quantity, unit_price_cents)`

Volumen de datos de desarrollo (`npm run db:seed`): 5 000 clientes, 300 productos, 50 000 órdenes, 150 000 ítems.

## Observabilidad

`src/lib/requestLogger.js` registra por request: método, ruta, status, duración y número de queries. `src/db/pool.js` expone `withQueryTracking(fn)` para contar queries en tests.

## Errores

Los services lanzan `NotFoundError` (404) o `ValidationError` (400) de `src/lib/errors.js`; el manejador de `src/app.js` los convierte en respuesta JSON.

## Deuda técnica conocida

| Qué | Dónde | Regla |
|---|---|---|
| Acceso a datos fuera de repositorios | Algunos services antiguos | No copiar; lo nuevo va en `repositories/` |
| Paginación duplicada | `src/utils/paginate.js` (deprecado) vs `src/lib/pagination.js` | Usar `lib/pagination.js` |
| Código heredado de v1 | `src/legacy/` | No modificar ni usar en código nuevo |
| Dump de esquema obsoleto | `db/schema.sql` | No editar; el esquema está en `sql/migrations/` |
| README desactualizado | Sección "Notas de desarrollo" | Seguir `CLAUDE.md` |
| Nombres y formato mezclados | Repositorios que devuelven snake_case, funciones `get_*` / `fetch*`, variables `snake_case` | Código nuevo: camelCase y `toCamel` en repositorios |
| Estilos de ruta distintos | `routes/products.js` (`.then/.catch`), `routes/reports.js` (`res.status().json`) | Rutas `async` + `lib/errors` |

