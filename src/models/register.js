const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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


registerSchema.method.generateAuthToken = function(){
    try {
        console.log(this._id)
        const token = jwt.sign({_id:this._id},"mynameisakashmauryaandiamwebdeveloper")
        console.log(token)
    } catch (error) {
        res.send("The error part"+ error)
        console.log("The error part"+ error)
    }
}

// converting password into bash
registerSchema.pre("save", async function (next){

    if(this.isModified("password")){
        console.log(`the current password is ${this.password}`)
        this.password = await bcrypt.hash(this.password,10)
        console.log(`the current password is ${this.password}`)
        next()
    }
})

const Register = new mongoose.model("Register",registerSchema)

module.exports = Register;