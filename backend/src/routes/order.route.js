const express = require('express');
const router = express.Router();

const {
  createOrder,
  getOrderByCode,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/order.controller');

router.post('/', createOrder);            // khách đặt hàng
router.get('/:code', getOrderByCode);     // khách tra cứu đơn
router.get('/', getAllOrders);            // admin xem list (tạm chưa khóa)
router.patch('/:code/status', updateOrderStatus); // admin đổi trạng thái

module.exports = router;
