const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema

const userSchema = new Schema({
    name:{
        type:string,
        required:true
    },
    email:{
        type:string,
        required:true
    },
    phone:{
        type:string,
        required:true
    },
    avater:{
        type:string,
        required:true
    },
    join_date:{
        type:Date,
        default:Date.now
    }

});
module.exports = User = mongoose.model('users',userSchema);
