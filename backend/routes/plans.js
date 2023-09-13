const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');
const authorizeToken = require('../middleware/authorizeToken');

//Get all plans
router.get('/',authorizeToken,async(req,res)=>{
    try{
        const plans = await Plan.find();
        res.status(200).json(plans);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

//Get a plan
router.get('/:id',authorizeToken,async(req,res)=>{
    try{
        const plans = await Plan.findOne({_id:req.params.id});
        res.status(200).json(plans);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;