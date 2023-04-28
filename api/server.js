// git init --y
// npm i express 

const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => res.send("hello world")) // client tarafına bir şey gönderme

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})