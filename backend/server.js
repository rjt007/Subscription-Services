require('dotenv').config()
const express = require('express');
const app = express();

const usersRoute = require('./routes/users');

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello world')
});

app.use('/api/user',usersRoute);

//Database Connection
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}..`));