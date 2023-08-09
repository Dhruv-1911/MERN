import express from 'express';
import data from './data.js';
import cors from 'cors';
import connect_db from './DB/connect.js';
import dotenv from "dotenv"
import seedrouter from "./routes/seedrouter.js"
import productrouter from "./routes/productrouter.js"

const app = express();
app.use(cors());
dotenv.config();

app.use("/api/seed",seedrouter);
app.use("/api/product",productrouter);

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