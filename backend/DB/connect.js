import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const url = process.env.DB
const connect_db = mongoose.connect(url)
    .then(() => {
        console.log("Connect to Databse..")
    })
    .catch((err) => {
        console.log(err);
    })

export default  connect_db;