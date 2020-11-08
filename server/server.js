require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const sqlite = require('sqlite');
const { extractCountries } = require('./utils');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/customers', require('./customers/customers.controller'));

// create a GET route
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

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
