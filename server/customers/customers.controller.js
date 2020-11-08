const express = require('express');
const router = express.Router();
const customerService = require('./customer.service');

// routes


router.get('/', getAll);
router.get('/:id', getOne);
router.get('/:id/orders', getOrders);

module.exports = router;

function getOne(req, res, next) {
    customerService.getOne(req.params.id)
        .then(customer => res.json(customer))
        .catch(next);
}

function getOrders(req, res, next) {
    customerService.getOrders(req.params.id)
        .then(orders => res.json(orders))
        .catch(next);
}

function getAll(req, res, next) {
    customerService.getAll(req.query)
        .then(customers => res.json(customers))
        .catch(next);
}
