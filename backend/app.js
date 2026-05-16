const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectdb = require("./config/connectdb");
const customer = require("./routes/customer");
const payment = require("./routes/payemnt");

dotenv.config({ path: path.join(__dirname, "./config/.env") });
const app = express();
app.use(express.json());
connectdb();

app.use("/api/v1", customer);
app.use("/api/v1", payment);

app.listen(process.env.PORT, () => {
    console.log(`The serever is runing at ${process.env.PORT}`);
})