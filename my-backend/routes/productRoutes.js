const express = require('express');
const { createProduct, getProducts, getProductById, searchProducts, getSupplierProducts, deleteProduct, updateProduct } = require('../controllers/productController.js');
const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/supplier/:supplierId', getSupplierProducts);
router.get('/products/search', searchProducts);
router.get('/products/:id', getProductById);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);

module.exports = router;