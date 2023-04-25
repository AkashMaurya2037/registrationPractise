const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    }
})



const Register = new mongoose.model("Register",registerSchema)

module.exports = Register;