const express = require('express');
const { createOrder, getOrderBySupplier, getOrderByCustomer } = require('../controllers/orderController');
const router = express.Router();

router.post('/create', createOrder);
router.get('/supplier/:supplierId', getOrderBySupplier);
router.get('/customer/:customerId', getOrderByCustomer);

module.exports = router;