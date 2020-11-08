const sqlite = require('sqlite');
const { extractCountries } = require('../utils');

module.exports = {
  getCustomersFilters
};

async function getCustomersFilters() {
  return sqlite.open(`${__dirname}/../data/database.sqlite`, { Promise }).then(async db => {
    const data = await db.all('SELECT * FROM customers;');

    return {...extractCountries(data)};
  });
}
