const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    name:{
        type:String,
        enum: ['mobile','basic','standard','premium'],
        required:true
    },
    interval:{
        type: String,
        enum: ['monthly','yearly'],
        required:true
    },
    price:{
        type:Number,
        enum: [100,200,500,700,1000,2000,5000,7000],
        required:true
    },
    quality:{
        type:String,
        enum: ['good','better','best'],
        required:true
    },
    resolution:{
        type:String,
        enum: ['480p','1080p','4K+HDR'],
        required:true
    },
    devices:[{
        type:String,
        enum: ['phone','tablet','computer','tv'],
        required:true
    },]
});

module.exports = mongoose.model('Plan',planSchema);

