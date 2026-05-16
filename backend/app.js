const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectdb = require("./config/connectdb");

dotenv.config({ path: path.join(__dirname, "./config/.env") });
const app = express();
connectdb();

app.listen(process.env.PORT, ()=>{
    console.log(`The serever is runing at ${process.env.PORT}`);
})