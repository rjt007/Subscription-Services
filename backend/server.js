require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

const usersRoute = require('./routes/users');
const plansRoute = require('./routes/plans');

//CORS Setting
const CorsOptions = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH'
    ],
    allowedHeaders: [
      'Content-Type', 'Authorization'
    ],
};
  
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.json({request:'success'});
});

app.use('/api/user',usersRoute);
app.use('/api/plans',plansRoute);

//Database Connection
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}..`));