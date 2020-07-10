const express = require('express')

const OrderCtrl = require('../Controllers/order-ctrl')

const router = express.Router();

router.get('/orders', OrderCtrl.getOrders);
router.post('/order', OrderCtrl.createOrder);
router.delete('/order/:oid', OrderCtrl.deleteOrder);
router.delete('/delete/all', OrderCtrl.deleteAll);

module.exports = router;