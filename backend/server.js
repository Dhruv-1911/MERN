import express from 'express';
import data from './data.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/product', (req, res) => {
  res.json(data.product);
});

app.get('/api/product/slug/:slug', (req, res) => {
  const product = data.product.find((x) => x.slug === req.params.slug);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ message: 'Not Found Product' });
  }
});
app.get('/api/product/:id', (req, res) => {
  const product = data.product.find((x) => x._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ message: 'Not Found Product' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${5000}.`));
