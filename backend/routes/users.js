require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authorizeToken = require('../middleware/authorizeToken');
const Plan = require('../models/plan');

//User Registration
router.post('/register', async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:'Error! All fields are required.'});
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            name:name,
            email:email,
            password:hashedPassword
        });
        await user.save();
        return res.status(201).json({message:'User registered successfully.'});
    }
    catch(err){
        return res.status(501).json({message:err.message});
    }
});

//User Login
router.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:'Error! All fields are required.'});
    }
    try{
        const user = await User.findOne({email:email});
        if(user==null){
            return res.status(400).json({message:'Error! Enter a valid email.'});
        }
        else if(!(await bcrypt.compare(password,user.password))){
            return res.status(400).json({message:'Error! Password entered is wrong.'});
        }
        else{
            const userId = {id:user.id};
            const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
            return res.status(201).json({accessToken:accessToken});
        }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

//User Subscription For a Plan
router.post('/subscribe',authorizeToken,async(req,res)=>{
    const {planId, stripeToken} = req.body;
    if(!planId || !stripeToken){
        return res.status(400).json({message:'Error! either Id or Token is missing'});
    }
    try{
        const user = await User.findOne({_id:req.userId.id});
        const plan = await Plan.findOne({_id:planId});

        //Create a stripe customer
        const customer = await stripe.customers.create({
            name: user.name,
            email: user.email,
            payment_method: stripeToken,
            invoice_settings: { default_payment_method: stripeToken }
        });

        // Create a product
        const product = await stripe.products.create({
            name: 'Subscription Plans'
        });

        //Create a subscription;
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                  price_data: {
                    currency: "INR",
                    product: product.id,
                    unit_amount: plan.price*100,
                    recurring: {
                      interval: plan.interval==='monthly'?'month':'year',
                    },
                  },
                },
            ],
            payment_settings: {
                payment_method_types: ["card"],
                save_default_payment_method: "on_subscription",
            },
            expand: ["latest_invoice.payment_intent"]
        });

        //Update user with subsciption details
        await User.findByIdAndUpdate(req.userId.id, {subscription:{
            planId: planId,
            subscriptionId: subscription.id
        }
        });
        res.status(201).json({clientSecret: subscription.latest_invoice.payment_intent.client_secret});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

//Unsubscribe from Subscription
router.post('/unsubscribe',authorizeToken,async(req,res)=>{

    try{
        const user = await User.findOne({_id:req.userId.id});
        let subscriptionId = user.subscription.subscriptionId;
        let planId = user.subscription.planId;
        if(planId==null || subscriptionId==null){
            return res.status(400).json({message:'Error! User Already Unsubscribed!'});
        }
    
        //Cancel Subscription
        await stripe.subscriptions.cancel(user.subscription.subscriptionId);
    
        //Updating the database
        user.subscription.subscriptionId = null;
        user.subscription.planId = null;
        await user.save();
    
        res.status(201).json({message:'User unsubscribed successfully!'});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;
