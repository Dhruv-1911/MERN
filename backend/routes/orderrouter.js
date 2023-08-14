import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../model/order.js';
import { isAuth } from '../utils.js';
const router = express.Router();

router.post(
  '/',
  isAuth,
  asyncHandler(async (req, res) => {
    const Neworder = new Order({
      orderItem: req.body.orderItem.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      ItemPrice: req.body.ItemPrice,
      ShippingPrice: req.body.ShippingPrice,
      TaxPrice: req.body.TaxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    const order = await Neworder.save();
    res.status(201).json({ message: 'New Order Created', order });
  })
);

router.get(
  '/mine',
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id });
    if (order) {
      res.status(201).send(order);
    } else {
      res.status(404).json({ message: 'Order Not Found' });
    }
  })
);

router.get(
  '/:id',
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(201).send(order);
    } else {
      res.status(404).json({ message: 'Order Not Found' });
    }
  })
);

router.put(
  '/:id/pay',
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      (order.isPaid = true), (order.paidAt = Date.now());
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateOrder = await order.save();
      res.status(201).send(updateOrder);
    } else {
      res.status(404).json({ message: 'Order Not Found' });
    }
  })
);
export default router;
