import express from 'express';
import Product from '../model/product.js';
import asyncHandler from 'express-async-handler';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

router.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);
router.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send({ message: 'Not Found Product' });
  }
});
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send({ message: 'Not Found Product' });
  }
});

export default router;
