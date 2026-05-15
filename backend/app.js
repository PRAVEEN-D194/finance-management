const express = require("express");

const app = express();
app.get('/', (req, res)=>{
    res.send("hello world this for get request");
})

app.listen(3000, ()=>{
    console.log("The serever is runing at 3000");
})