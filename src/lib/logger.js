function format(level, message) {
  return `${new Date().toISOString()} ${level.padEnd(5)} ${message}`;
}

module.exports = {
  info: (message) => console.log(format('info', message)),
  warn: (message) => console.warn(format('warn', message)),
  error: (message) => console.error(format('error', message)),
};
