// Métricas reales de la sesión actual de Claude Code, leídas del registro local
// (~/.claude/projects/<carpeta>/<sesión>.jsonl). Las usa el comando /reporte.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const base = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const dir = path.join(base, 'projects', process.cwd().replace(/[^a-zA-Z0-9]/g, '-'));

function latestSession() {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir)
    .filter((f) => f.endsWith('.jsonl'))
    .map((f) => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  return files.length ? path.join(dir, files[0].f) : null;
}

function textOf(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.map((c) => (c && c.text) || '').join(' ');
  return '';
}

const file = latestSession();
if (!file) {
  console.log(JSON.stringify({ error: `No encontré registros de sesión en ${dir}` }, null, 2));
  process.exit(0);
}

let start = null;
let end = null;
const usageByMessage = new Map();
const tools = {};
const edited = new Set();
let commands = 0;
let testRuns = 0;

for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
  if (!line.trim()) continue;
  let e;
  try { e = JSON.parse(line); } catch { continue; }
  const msg = e.message || {};
  // Se cuenta hasta que el estudiante pide el reporte.
  if (e.type === 'user' && textOf(msg.content).includes('<command-name>/reporte')) break;
  if (e.timestamp) { start = start || e.timestamp; end = e.timestamp; }
  if (e.type !== 'assistant') continue;
  if (msg.id && msg.usage) usageByMessage.set(msg.id, msg.usage);
  for (const c of msg.content || []) {
    if (!c || c.type !== 'tool_use') continue;
    tools[c.name] = (tools[c.name] || 0) + 1;
    const input = c.input || {};
    if (['Edit', 'Write', 'MultiEdit'].includes(c.name) && input.file_path) {
      edited.add(path.relative(process.cwd(), input.file_path));
    }
    if (c.name === 'Bash') {
      commands += 1;
      if (/npm (run )?test|node --test/.test(input.command || '')) testRuns += 1;
    }
  }
}

let output = 0;
let context = 0;
for (const u of usageByMessage.values()) {
  output += u.output_tokens || 0;
  context += (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
}

console.log(JSON.stringify({
  claude_md_presente: fs.existsSync('CLAUDE.md'),
  duracion_segundos: start && end ? Math.round((new Date(end) - new Date(start)) / 1000) : null,
  pasos_del_agente: usageByMessage.size,
  tokens_generados: output,
  tokens_de_contexto_leidos: context,
  comandos_ejecutados: commands,
  corridas_de_tests: testRuns,
  archivos_modificados: [...edited],
  herramientas: tools,
}, null, 2));
