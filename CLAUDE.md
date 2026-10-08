# demo-orders-api

API REST de clientes, productos y órdenes. Node 20+, Express 5, Postgres 16 con SQL plano (`pg`, sin ORM).

Modelo estructurado del proyecto: `.engineering/blueprint.yaml`. Arquitectura detallada: `docs/architecture.md`.

## Comandos

- Levantar la base: `docker compose up -d && npm run db:setup`
- Reiniciar la base: `npm run db:reset`
- Tests: `npm test` (unit: `npm run test:unit`, integración: `npm run test:integration`)
- Servidor: `npm start` (API en 3100, Postgres en 5433) — cada request loguea duración y número de queries (`queries=N`)

## Arquitectura (reglas)

Capas: `routes/` → `services/` → `repositories/` → `db/`.

- **Solo `src/repositories/` accede a datos.** Ningún service o route importa `src/db/` ni escribe SQL.
- **Deuda conocida:** hay services antiguos que todavía hacen SQL directo. No copies ese patrón: el código nuevo o modificado va en `repositories/`.
- Las rutas solo parsean/validan parámetros (con `src/lib/pagination.js`) y llaman a un service.
- **Deprecado:** `src/utils/paginate.js`. No lo uses en código nuevo.
- **`src/legacy/`:** código heredado de v1. No lo modifiques ni lo uses en código nuevo.
- Los services contienen la lógica de negocio y arman los DTOs de respuesta.

## Convenciones de código

Hay código viejo que no las sigue. **No lo imites:** el código nuevo o modificado sigue estas reglas.

- **camelCase siempre** en JavaScript: variables, funciones y propiedades. Nada de `snake_case` (aunque veas `order_list`, `get_order_totals`, etc.).
- **Los repositorios devuelven objetos en camelCase**, convirtiendo las filas con `toCamel` de `src/lib/case.js` (como `customerRepository`). Los services nunca reciben columnas `snake_case`.
- **Nombres en repositorios:** `findById`, `findPage`, `findAll`. No `get_*` ni `fetch*`.
- **Rutas:** `async (req, res)` y errores lanzando `NotFoundError` / `ValidationError` de `src/lib/errors.js`. No `.then().catch()` ni `res.status(...).json(...)` a mano.
- Respuestas JSON en camelCase.

## Datos

- El esquema vive **solo** en `sql/migrations/`. **Las migraciones son append-only**: nunca edites una existente; crea `NNN_descripcion.sql` con el siguiente número y aplícala con `npm run db:migrate`.
- `db/schema.sql` es un dump viejo que ya no se mantiene: **no lo edites ni lo uses como referencia.**

## Cómo validar un cambio

1. `npm test` debe pasar completo.
2. No cambies umbrales ni aserciones de tests existentes para que pasen. Puedes agregar tests nuevos.
3. Si el cambio toca rendimiento, deja evidencia antes/después (salida del test o línea del log).

## Ojo: documentación desactualizada

- La sección "Notas de desarrollo" del `README.md` está desactualizada: `npm run migrate` no existe y el esquema no está en `db/schema.sql`.

## No modificar

- `sql/migrations/001_schema.sql`
- `db/schema.sql` y `src/legacy/`
- Tests existentes en `test/` (solo agregar)
