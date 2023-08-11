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
    })
    const order = await Neworder.save();
    res.status(201).json({ message: 'New Order Created', order });
  })
);
export default router;
