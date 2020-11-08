require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const _ = require('lodash');
const sqlite = require('sqlite');
const { buildQuery, extractCountries, formatCustomer, formatOrders } = require('./utils');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// create a GET route
app.get('/customers', (req, res) => {
    sqlite.open(`${__dirname}/data/database.sqlite`, { Promise }).then(db => {
        db.all(`SELECT * FROM customers ${buildQuery(req.query)};`).then(data => {
            res.send({
                data: data.map(formatCustomer)
            })
        })
        .catch(e => console.log(e));
    });
});

app.get('/customers-filters', (req, res) => {
    sqlite.open(`${__dirname}/data/database.sqlite`, { Promise }).then(db => {
        db.all('SELECT * FROM customers;').then(data => {
            res.send({
                data: {
                    ...extractCountries(data)
                }
            })
        })
        .catch(e => console.log(e));
    });
});

app.get('/customers/:id', (req, res) => {
    sqlite.open(`${__dirname}/data/database.sqlite`, { Promise }).then(db => {
        db.get(`SELECT * FROM customers WHERE customerNumber = '${req.params.id}';`).then(data => {
            if (!data) {
                res.status(404).send('Not found');

                return;
            }

            res.send({
                data: formatCustomer(data)
            })
        })
        .catch(e => console.log(e));
    });
});

app.get('/customers/:id/orders', (req, res) => {
    sqlite.open(`${__dirname}/data/database.sqlite`, { Promise }).then(db => {
        db.all(`SELECT * FROM orders o LEFT JOIN orderdetails od ON o.orderNumber = od.orderNumber LEFT JOIN products p on od.productCode = p.productCode WHERE o.customerNumber = '${req.params.id}';`).then(data => {
            if (!data.length) {
                res.status(404).send('Not found');

                return;
            }

            res.send({
                data: _.orderBy(Object.values(formatOrders(data)), ['orderDate'], ['desc'])
            })
        });
    })
    .catch(e => console.log(e));
});

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
