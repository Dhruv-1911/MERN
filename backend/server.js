import express from 'express';
const app = express();
// import data from './data';

app.get("/api/product" ,(req,res)=>{
    res.json("hello")
})


const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${5000}.`));