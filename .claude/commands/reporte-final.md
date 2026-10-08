---
description: Junta los reportes de las dos corridas del reto en reto-sesion02.md
disable-model-invocation: true
---

Genera el reporte final del reto en el archivo `reto-sesion02.md`, en la raíz del repo.

Pasos:
1. Lee los dos reportes con `git show reto-sin:REPORTE.md` y `git show reto-con:REPORTE.md`. Si alguno no existe (la rama no existe o no tiene REPORTE.md), indícalo en su sección como "Corrida no realizada" y sigue con el otro.
2. Escribe `reto-sesion02.md` con EXACTAMENTE esta estructura:

```markdown
# Reto sesión 02

## Comparación de datos
| Dato | sin-contexto | con-contexto |
|---|---|---|
| Corrida (orden) | | |
| Duración (hora_fin − hora_inicio) | | |
| Tiempo del test (ms) antes → después | | |
| Tests antes → después | | |
| Veces que corrió tests | | |
| Archivos modificados | | |
| Modificó tests existentes | | |
| Leyó CLAUDE.md | | |

Diferencias observables entre las dos corridas, en máximo 5 viñetas, solo con lo que dicen los reportes. Sin opiniones.

## Corrida sin-contexto
<contenido completo de REPORTE.md de reto-sin, tal cual>

## Corrida con-contexto
<contenido completo de REPORTE.md de reto-con, tal cual>

## Mi comparación
_(Escrita por el estudiante)_
- ¿En cuál corrida trabajó mejor el agente y por qué?
- ¿Qué información le faltó al agente?
- ¿Qué le rechacé o corregí del plan?
```

Reglas:
- Llena la tabla solo con datos de los reportes. Si falta uno, escribe "no disponible".
- Copia los reportes **sin modificarlos**.
- No escribas nada en "Mi comparación": es del estudiante.
- No hagas commit de este archivo.

Al terminar, dile al estudiante:
1. Que complete "Mi comparación" y las secciones 7 de cada corrida que hayan quedado vacías.
2. Que suba `reto-sesion02.md` al formulario de feedback de la sesión ("Coloca aquí el entregable"). Si el formulario no acepta `.md`, que lo pase a `.docx`.
