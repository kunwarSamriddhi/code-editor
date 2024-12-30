const jwt = require("jsonwebtoken")
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const fetchuser = (req,res,next) =>{
    const token = req.header("auth-token")
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token,secretKey)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).json({error:"Invalid token"})
    }
}

module.exports = fetchuser