// Formato de moneda heredado del sistema anterior (v1).
function formatMoney(cents) {
  return '$' + (cents / 100).toFixed(2);
}

module.exports = { formatMoney };
