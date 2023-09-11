const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowecase:true
    },
    password:{
        type: String,
        required:true
    },
    subscription:{
      planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
      },
      subscriptionId: {
        type: String,
      }
    }
});

module.exports = mongoose.model('User',userSchema);
