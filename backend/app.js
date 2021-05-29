const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const reqRoute = require('./routes/request-route');

app.use(express.static('./public'))

app.use('/',reqRoute)

app.listen(3000 , ()=>{
    console.log("Listening at Port 3000")
})