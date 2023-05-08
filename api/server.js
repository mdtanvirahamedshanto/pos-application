// git init --y
// npm i express 

const express = require("express");
const mongoose = require("mongoose"); // mongoose
const dotenv = require("dotenv"); // npm i dotenv
const app = express();
const PORT = 5000;

dotenv.config();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB")
    }catch(error){
        throw error
    }
}

app.get("/", (req, res) => res.send("hello world")) // client tarafına bir şey gönderme

app.listen(PORT, () => {
    connect();
    console.log(`Example app listening on port ${PORT}`)
})