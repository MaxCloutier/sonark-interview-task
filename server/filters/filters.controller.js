const express = require('express');
const router = express.Router();
const filterService = require('./filter.service');

// routes
router.get('/customers', getCustomersFilters);

module.exports = router;

function getCustomersFilters(req, res, next) {
    filterService.getCustomersFilters()
        .then(filters => res.json(filters))
        .catch(next);
}
