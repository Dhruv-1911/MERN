import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connect_db = mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Connect to Databse..")
    })
    .catch((err) => {
        console.log(err);
    })

export default  connect_db;