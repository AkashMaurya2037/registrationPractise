const jwt =  require("jsonwebtoken")
const register = require("../models/register")

const auth = async (req,res,next) => {
    try {
        const token = req.cookies.jwt
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        console.log(verifyToken)
        
        const user = await register.findOne({_id:verifyUser._id})
        console.log(user)

        next()
    } catch (error) {
        res.send(error).status(401)
    }
}

module.exports = auth