const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/");
});

app.post("/" , function (req , res){
    const body = req.body;
    const weight = parseFloat(body.weight);
    const height = parseFloat(body.height)/100;
    const result = weight / (height * height);
    res.send('Your BMI result is ' + result);
});

app.listen(3000 , function(){
    console.log("Server is running on port 3000.");
});