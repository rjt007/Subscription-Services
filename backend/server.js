require('dotenv').config()
const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('Hello world')
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}..`));