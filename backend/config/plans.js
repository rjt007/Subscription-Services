const Plan = require('../models/plan');

//Storing predefined Plans in database
const plans = [
    {
        name: 'mobile',
        interval: 'monthly',
        price: 100,
        quality:'good',
        resolution:'480p',
        devices:['phone','tablet']
    },
    {
        name: 'basic',
        interval: 'monthly',
        price: 200,
        quality:'good',
        resolution:'480p',
        devices:['phone','tablet','computer','tv']
    },
    {
        name: 'standard',
        interval: 'monthly',
        price: 500,
        quality:'better',
        resolution:'1080p',
        devices:['phone','tablet','computer','tv']
    },
    {
        name: 'premium',
        interval: 'monthly',
        price: 700,
        quality:'best',
        resolution:'4K+HDR',
        devices:['phone','tablet','computer','tv']
    },
    {
        name: 'mobile',
        interval: 'yearly',
        price: 1000,
        quality:'good',
        resolution:'480p',
        devices:['phone','tablet']
    },
    {
        name: 'basic',
        interval: 'yearly',
        price: 2000,
        quality:'good',
        resolution:'480p',
        devices:['phone','tablet','computer','tv']
    },
    {
        name: 'standard',
        interval: 'yearly',
        price: 5000,
        quality:'better',
        resolution:'1080p',
        devices:['phone','tablet','computer','tv']
    },
    {
        name: 'premium',
        interval: 'yearly',
        price: 7000,
        quality:'best',
        resolution:'4K+HDR',
        devices:['phone','tablet','computer','tv']
    }
];

const savePlanInDB = async()=>{
    try{
        await Plan.insertMany(plans);
    }
    catch(err){
        console.error(err.message);
    }
};

module.exports = savePlanInDB;