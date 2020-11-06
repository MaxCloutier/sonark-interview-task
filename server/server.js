const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const sqlite = require('sqlite');

// console.log that your server is up and running
app.listen(port, () => console.log(`Server is up and running.`));

// create a GET route
app.get('/customers', (req, res) => {
    sqlite.open(`${__dirname}/data/database.sqlite`, { Promise }).then(db => {
        db.all('SELECT * FROM customers;').then(data => {
            res.send({
                data
            })
        })
        .catch(e => console.log(e));
    });
});

app.get('/users', (req, res) => {
    sqlite.open(`${__dirname}/data/database.sqlite`, { Promise }).then(db => {
        db.all('SELECT * FROM users;').then(data => {
            res.send({
                data
            })
        });
    });
});

app.get('/orders', (req, res) => {
    sqlite.open(`${__dirname}/data/database.sqlite`, { Promise }).then(db => {
        db.all('SELECT * FROM orders o LEFT JOIN orderdetails od ON o.orderNumber = od.orderNumber LEFT JOIN products p on od.productCode = p.productCode;').then(data => {
            res.send({
                data: formatOrders(data)
            })
        });
    })
    .catch(e => console.log(e));
});

function formatOrders(data) {
    return data.reduce((acc, {
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
