import express from 'express';
import cors from 'cors';
import connect_db from './DB/connect.js';
import dotenv from 'dotenv';
import seedrouter from './routes/seedrouter.js';
import productrouter from './routes/productrouter.js';
import userrouter from './routes/userrouter.js';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
dotenv.config();

app.use('/api/seed', seedrouter);
app.use('/api/product', productrouter);
app.use('/api/user', userrouter);


app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT;
const start = async () => {
  try {
    //connect database
    await connect_db;
    app.listen(PORT, () => {
      console.log(`listening on ${PORT} port...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
start();
