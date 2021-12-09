require("dotenv").config()

const jwt = require('jsonwebtoken');

const verifyToken = (token)=>{
     return jwt.verify(token,process.env.JWT_ACCESS_KEY);
}
module.exports = (req,res,next) =>{
    // if we recieve the bearer token in the header
    const bearerToken = req?.headers?.authorization

    // if not recieved or token is not a bearer token then throw and error
    if(! bearerToken || ! bearerToken.startsWith('Bearer ')) return res.status(400).json({message: 'Invalid bearer token'})

    //else we will try to get the user from the token and
    const token = bearerToken.split(" ")[1]

    const user = verifyToken(token);
    //if no user found then we will throw an error
    if(!user) return res.status(404).json({message: "user not found"});

    // else we will attach the user to the req
    req.user = user;

    // return next
    return next();
}