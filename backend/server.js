import express from 'express';
import data from './data.js';
import cors from 'cors'

const app = express();
app.use(cors())
app.get("/api/product" ,(req,res)=>{
    res.json(data.product)
})


const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${5000}.`));