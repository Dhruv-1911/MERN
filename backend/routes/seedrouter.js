import express from 'express';
import Product from '../model/product.js';
import data from '../data.js';
const router = express.Router();

router.get('/', async (req, res) => {
  await Product.deleteMany();
  const seedproduct = await Product.insertMany(data.product);
  res.send({ seedproduct });
});

export default router;
