const express = require('express');
const { getSupplierProfile, getCustomerProfile } = require('../controllers/userController.js');
const router = express.Router();

router.get('/supplier/:id', getSupplierProfile);
router.get('/customer/:id', getCustomerProfile);

module.exports = router;