require("dotenv").config();
const express = require('express');
const app= express();
//var data = require('./database');

const {router} = require("./routes/route.js");
app.use(express.json());
app.use(router); 
// const empRoute = require("./routes/emp.js");
// const salaryRoute = require("./routes/salary.js");

app.listen(process.env.APP_PORT,()=>{
    console.log(`I am listening ${process.env.APP_PORT}`);

})
