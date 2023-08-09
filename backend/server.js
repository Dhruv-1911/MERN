import express from 'express';
import data from './data.js';
import cors from 'cors';
import connect_db from './DB/connect.js';
import dotenv from "dotenv"

const app = express();
app.use(cors());
dotenv.config();

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

const PORT = process.env.PORT;
const start =async ()=>{
  try {
      //connect database
      await connect_db;
      app.listen(PORT ,()=>{
          console.log(`listening on ${PORT} port...`);
      })
      
  } catch (error) {
      console.log(error.message);
  }
}
start();