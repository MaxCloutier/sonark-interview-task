
function buildQuery(queryParams) {
  const keys = Object.keys(queryParams)

  if (!keys.length) {
      return ''
  }

  const query = []

  const { keywords, country, city } = queryParams

  if (keywords) {
      // TODO check if there's a risk of SQL injection, don't have enough backend experience to know it
      query.push(`customerName LIKE '%${keywords}%'`)
  }


  if (city) {
      query.push(`city = '${city}'`)
  } else if (country) {
      // No need to check both since city is within the country
      query.push(`country = '${country}'`)
  }

  return ` WHERE ${query.join(' AND ')}`
}

function extractCountries(customers) {
  const countryCities = {}
  const countries = customers.reduce((acc, {country, city}) => {
      if (acc.indexOf(country) === -1) {
          acc.push(country)
          countryCities[country] = [city]
      } else if (countryCities[country].indexOf(city) === -1) {
          countryCities[country].push(city)
      }

      return acc
  }, []).sort()

  Object.keys(countryCities).forEach(key => {
      countryCities[key].sort()
  })

  return {countries, countryCities}
}

function formatCustomer(customer) {
  return {
      ...customer,
      formatedAddress: [
          customer.addressLine1,
          customer.city,
          customer.state,
          customer.country,
          customer.postalCode
      ].filter(Boolean).join(', ')
  }
}

function formatOrders(customers) {
  return customers.reduce((acc, {
    buyPrice,
    MSRP,
    productCode,
    productDescription,
    productLine,
    productName,
    productScale,
    productVendor,
    quantityInStock,
    quantityOrders,
    priceEach,
    orderLineNumber,
    ...o
  }) => {
    if (!acc[o.orderNumber]) {
      acc[o.orderNumber] = {...o, items: []}
    }

    acc[o.orderNumber].items.push({
      quantityOrders,
      priceEach,
      orderLineNumber,
      product: {
        buyPrice,
        MSRP,
        productCode,
        productDescription,
        productLine,
        productName,
        productScale,
        productVendor,
        quantityInStock
      }
    })
    return acc
  }, {})
}

module.exports = { buildQuery, extractCountries, formatCustomer, formatOrders }
