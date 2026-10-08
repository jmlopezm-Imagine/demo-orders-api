const customerRepository = require('../repositories/customerRepository');
const orderRepository = require('../repositories/orderRepository');

// Ranking de clientes por facturación. Desempata por id de cliente ascendente.
function rankCustomersByRevenue(orderTotals, customers, limit) {
  const ranking = [];

  for (const order of orderTotals) {
    const customer = customers.find((c) => c.id === order.customer_id);
    if (!customer) continue;

    let entry = ranking.find((e) => e.customerId === customer.id);
    if (!entry) {
      entry = {
        customerId: customer.id,
        name: customer.name,
        email: customer.email,
        orders: 0,
        revenueCents: 0,
      };
      ranking.push(entry);
    }

    entry.orders += 1;
    entry.revenueCents += order.total_cents;
    ranking.sort((a, b) => b.revenueCents - a.revenueCents || a.customerId - b.customerId);
  }

  return ranking.slice(0, limit);
}

async function topCustomers({ limit }) {
  const [customer_list, order_totals] = await Promise.all([
    customerRepository.fetchAll(),
    orderRepository.get_order_totals(),
  ]);
  return rankCustomersByRevenue(order_totals, customer_list, limit);
}

module.exports = { topCustomers, rankCustomersByRevenue };
