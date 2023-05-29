
const express = require("express");
const BodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.send("Hello");
});

app.listen("3000", function(){
    console.log("Server running on port 3000");
});