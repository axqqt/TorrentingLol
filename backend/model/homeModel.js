const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        default:""
    },
    password:{
        type:String,
        required:true,
        trim:true,
        default:"" 
    },
    roles:{
        activity:{
            type:Boolean,
            default:true,
        },
        status:{
            type:String,
            default:"Online"
        }
    }
},{timestamps:true});

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;