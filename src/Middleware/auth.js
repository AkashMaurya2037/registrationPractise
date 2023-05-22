const jwt =  require("jsonwebtoken")
const register = require("../models/register")

const auth = async (req,res,next) => {
    try {
        const token = req.cookies.jwt
        console.log(`${token} `)
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        console.log(`${verifyUser} Token Verified `)
        
        const user = await register.findOne({_id:verifyUser._id})
        console.log(`${user} This is the user.`)

        req.user = user
        req.token = token

        next()
        
    } catch (error) {
        res.send(error).status(401)
    }
}

module.exports = auth