const mongoose = require("mongoose");

const connectdb = async()=>{
    await mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log(`database connected successfully on host ${con.connection.host}`);
    })
}

module.exports = connectdb;