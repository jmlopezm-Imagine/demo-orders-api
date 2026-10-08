---
description: Genera REPORTE.md del reto con métricas reales de esta sesión
disable-model-invocation: true
---

Genera el archivo `REPORTE.md` en la raíz del repo con EXACTAMENTE el formato de abajo.

Pasos:
1. Corre `node scripts/session-stats.js`. Sus números son **reales** (salen del registro de esta sesión): cópialos TAL CUAL en el frontmatter, sin redondear ni corregir.
2. Corre `git branch --show-current`, `claude --version` y `git diff --stat`.
3. Completa las secciones con lo que hicimos en esta sesión. No inventes: si no tienes un dato, escribe "no disponible".
4. Deja la sección 7 exactamente como está: la escribe el estudiante.
5. Escribe el archivo completo en una sola escritura.

```markdown
---
rama: <salida de git branch --show-current>
claude_code_version: <versión>
claude_md_presente: <de session-stats>
duracion_segundos: <de session-stats>
pasos_del_agente: <de session-stats>
tokens_generados: <de session-stats>
tokens_de_contexto_leidos: <de session-stats>
comandos_ejecutados: <de session-stats>
corridas_de_tests: <de session-stats>
archivos_modificados: <de session-stats>
tests_antes: { pass: <n>, fail: <n> }
tests_despues: { pass: <n>, fail: <n> }
modifico_tests_existentes: <sí | no>
---

## 1. Análisis corto del sistema
Máximo 5 líneas: qué hace el sistema, cómo está organizado y dónde vive el código del bug.

## 2. Evidencia del bug
Comando que se corrió antes de cambiar nada y su salida relevante.

## 3. Causa
2-3 líneas, con archivo y función.

## 4. Plan y cambios
Qué se propuso antes de editar y qué cambió al final, archivo por archivo.

## 5. Validación
Salida de los tests después del cambio. Antes vs. después.

## 6. Reglas del proyecto
Qué reglas se siguieron (del CLAUDE.md o deducidas del código), cuáles se supusieron y qué partes del código parecían contradecirse.

## 7. Opinión personal
_(Escribe aquí: qué le corregiste al agente, qué le faltó y cómo te pareció.)_
```

Al terminar, muestra el archivo y recuérdale al estudiante dos cosas:
1. Completar la sección 7.
2. Subir `REPORTE.md` al formulario de feedback de la sesión ("Coloca aquí el entregable"). Si no acepta `.md`, como `.docx`.
