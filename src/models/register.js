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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


registerSchema.methods.generateAuthToken = async function(){
    try {
        console.log(this._id)
        const token = jwt.sign({_id:this._id.toString()},"mynameisakashmauryaandiamwebdeveloper")
        this.tokens = this.tokens.concat({token:token})
        await this.save()  
        return token
    } catch (error) {
        res.send("The error part" + error)
        console.log("The error part" + error)
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