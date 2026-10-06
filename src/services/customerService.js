const customerRepository = require('../repositories/customerRepository');
const { NotFoundError } = require('../lib/errors');

async function listCustomers(pagination) {
  return customerRepository.findPage(pagination);
}

async function getCustomer(id) {
  const customer = await customerRepository.findById(id);
  if (!customer) throw new NotFoundError('customer', id);
  return customer;
}

module.exports = { listCustomers, getCustomer };
