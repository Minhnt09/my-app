const orderService = require('../services/order.service');

const createOrder = (req, res) => {
  const result = orderService.createOrder(req.body);
  if (result.error) return res.status(result.status || 400).json({ error: result.error });
  return res.status(201).json({ message: 'Đặt hàng thành công', data: result.data });
};

const getOrderByCode = (req, res) => {
  const { code } = req.params;
  const result = orderService.getOrderByCode(code);
  if (result.error) return res.status(result.status || 404).json({ error: result.error });
  return res.json({ data: result.data });
};

const getAllOrders = (req, res) => {
  const result = orderService.getAllOrders();
  return res.json({ data: result.data });
};

const updateOrderStatus = (req, res) => {
  const { code } = req.params;
  const { status } = req.body;

  const result = orderService.updateOrderStatus(code, status);
  if (result.error) return res.status(result.status || 400).json({ error: result.error });
  return res.json({ message: 'Cập nhật trạng thái thành công', data: result.data });
};

module.exports = { createOrder, getOrderByCode, getAllOrders, updateOrderStatus };
