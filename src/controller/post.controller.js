const express = require("express");

const Post = require("../models/post.model");

const authenticate = require("../middlewares/authenticate")
const router = express.Router();

router.post("/",authenticate , async (req,res) => {
  try{
    const user = req.user;

    const product = await Post.create({
      title: req.body.title,
      body:req.body.body,
      //imageUrls:["www.google.com"],
      user:user.user._id,
    });

    res.status(201).json({product: product});
  }
  catch(err){
  res.status(500).json({error: err.message});
}
});


module.exports = router;
