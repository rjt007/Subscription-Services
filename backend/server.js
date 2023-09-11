require('dotenv').config()
const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('Hello world')
});

//Database Connection
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}..`));