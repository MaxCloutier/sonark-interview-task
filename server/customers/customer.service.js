const sqlite = require('sqlite');
const { buildQuery, formatCustomer, formatOrders } = require('../utils');
const _ = require('lodash');

module.exports = {
  getAll,
  getOne,
  getOrders
};

async function getAll(query) {
  return sqlite.open(`${__dirname}/../data/database.sqlite`, { Promise }).then(async db => {
    const customers = await db.all(`SELECT * FROM customers ${buildQuery(query || {})};`);

    return customers.map(formatCustomer);
  });
}

async function getOne(id) {
  return sqlite.open(`${__dirname}/../data/database.sqlite`, { Promise }).then(async db => {
    const customer = await db.get(`SELECT * FROM customers WHERE customerNumber = '${id}';`);
    if (!customer) {
      throw 'NotFound'
    }

    return formatCustomer(customer);
  });
}

async function getOrders(id) {
  return sqlite.open(`${__dirname}/../data/database.sqlite`, { Promise }).then(async db => {
    const orders = await db.all(`SELECT * FROM orders o LEFT JOIN orderdetails od ON o.orderNumber = od.orderNumber LEFT JOIN products p on od.productCode = p.productCode WHERE o.customerNumber = '${id}';`);
    if (!orders.length) {
      throw 'NotFound'
    }

    return _.orderBy(Object.values(formatOrders(orders)), ['orderDate'], ['desc']);
  });
}
