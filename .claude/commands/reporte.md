---
description: Genera REPORTE.md de esta corrida del reto (uso: /reporte <corrida 1|2> <hora de inicio HH:MM>)
argument-hint: <corrida 1|2> <hora_inicio HH:MM>
disable-model-invocation: true
---

Genera el archivo REPORTE.md en la raíz del repo con EXACTAMENTE el formato de abajo, usando lo que hicimos en esta sesión.

Argumentos recibidos: $ARGUMENTS
(el primero es el número de corrida, el segundo la hora de inicio)

Reglas:
- No inventes. Si no tienes un dato, escribe "no disponible".
- Obtén los valores corriendo: `git branch --show-current`, `claude --version`, `date +%H:%M` y los tests del proyecto.
- `rama_base` es sin-contexto si la rama actual es reto-sin, y con-contexto si es reto-con.
- Deja la sección 7 exactamente como está: la escribe el estudiante.

Formato:

```markdown
---
rama_base: <sin-contexto | con-contexto>
corrida: <1 | 2>
hora_inicio: <HH:MM>
hora_fin: <HH:MM>
claude_code_version: <versión>
leyo_claude_md: <sí | no | no había>
tiempo_test_antes_ms: <ms del test que fallaba, antes del cambio>
tiempo_test_despues_ms: <ms del mismo test, después del cambio>
tests_antes: { pass: <n>, fail: <n> }
tests_despues: { pass: <n>, fail: <n> }
veces_que_corrio_tests: <n>
archivos_modificados: [<rutas>]
modifico_tests_existentes: <sí | no>
---

## 1. Análisis corto del sistema
Máximo 5 líneas: qué hace el sistema, cómo está organizado (capas) y dónde vive el código del bug.

## 2. Evidencia del bug
Comando que se corrió antes de cambiar nada y su salida relevante.

## 3. Causa
2-3 líneas, con archivo y función.

## 4. Plan y cambios
Qué propusiste antes de editar y qué cambiaste al final, archivo por archivo.

## 5. Validación
Salida de los tests después del cambio. Antes vs. después.

## 6. Reglas del proyecto
Qué reglas seguiste (del CLAUDE.md o deducidas del código) y cuáles supusiste.

## 7. Opinión personal
_(Escribe aquí: qué le corregiste al agente, qué le faltó y cómo te pareció.)_
```

Al terminar, muestra el archivo y recuérdale al estudiante dos cosas:
1. Completar la sección 7.
2. Guardar la corrida con `git add -A && git commit -m "reto: corrida <n>"` (solo local, sin push).
