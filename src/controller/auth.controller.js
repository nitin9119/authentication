require("dotenv").config();
const jwt = require("jsonwebtoken")

const User = require('../models/users.model');

const newToken = (user)=>{
    return jwt.sign({user: user}, process.env.JWT_ACCESS_KEY);
}



const register = async (req,res) => {
    try{

        //first we have to find if the email is already present or not
        let user =  await User.findOne({ email: req.body.email }).lean().exec();

        //if user's email already exixts then throw an error
        if(user) return res.status(400).json({status: 'Failed email already exixts'});

        //else will creste the user and hash the paasword
        user = await User.create(req.body);

        //we will create the token

        const token = newToken(user);

        //return the user and the token


        res.status(201).json({user,token});
    }catch(err){
        res.status(500).json({"status":"failed",message: err.message})
    }

}

const login = async (req,res) => {
    try{

        //first we have to find if the email is already present or not
        let user =  await User.findOne({ email: req.body.email });


    //if does not exist then throw an error
    if(!user) return res.status(400).json({message: 'Failed email already exixts'});


    //if matches then check password f matching or not
    const match = await user.checkPassword(req.body.password);


    //if password does not match then throw an error
    if(!match) return res.status(400).json({message: 'please enter correct email address and password'});


    //if it matches then create a token
    const token = newToken(user);

    // return the user and  the token

    res.status(201).json({user,token});

}catch(e) {
    return res.status(500).json({status: 'failed',message: e.message});
}
}

module.exports = {register, login};