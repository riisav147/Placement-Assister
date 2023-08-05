const dotenv = require("dotenv");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Router = require("./routes");
const app = express();
var cookieParser = require('cookie-parser')
app.use(cookieParser())


dotenv.config({ path: './config.env' });
require('./db/conn');

app.use(express.json());

app.use(require('./router/auth'));
const User = require('./model/userSchema');
app.use(express.json());


const PORT = process.env.PORT;


app.use(bodyParser.json());

// app.get('/about', (req, res) => {
//     console.log(`hello my About`);
//     res.send(`Hello world from about`);
// })

app.get('/login', (req, res) => {
    res.send(`Hello world from login`);
})

// app.get('/register',(req,res)=>{
//     res.send(`Hello world from register`);
// })


app.use(Router);
app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})







