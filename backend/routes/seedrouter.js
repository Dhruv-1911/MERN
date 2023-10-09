import express from 'express';
import Product from '../model/product.js';
import data from '../data.js';
import User from '../model/user.js';
const router = express.Router();

router.get('/', async (req, res) => {
  await Product.deleteMany();
  const seedproduct = await Product.insertMany(data.product);

  await User.deleteMany();
  const seeduser = await User.insertMany(data.user);
  res.send({ seedproduct , seeduser });
});
//add

export default router;
