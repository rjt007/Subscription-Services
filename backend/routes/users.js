require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User Registration
router.post('/register', async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json('Error! All fields are required.');
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            name:name,
            email:email,
            password:hashedPassword
        });
        await user.save();
        return res.status(201).json({success:true});
    }
    catch(err){
        return res.status(501).json(err.message);
    }
});

//User Login
router.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json('Error! All fields are required.');
    }
    try{
        const user = await User.findOne({email:email});
        if(user==null){
            return res.status(400).json('Error! Enter a valid email.');
        }
        else if(!(await bcrypt.compare(password,user.password))){
            return res.status(400).json('Error! Password entered is wrong.');
        }
        else{
            const userId = {id:user.id};
            const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
            return res.status(201).json({accessToken:accessToken});
        }
    }
    catch(err){
        return res.status(500).json(err.message);
    }
});

module.exports = router;
