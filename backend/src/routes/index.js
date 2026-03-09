const express = require('express');
const productRoutes = require('./product.route.js');
const orderRoutes = require('./order.route.js');

const router = express.Router();

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;

