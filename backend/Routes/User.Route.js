const express= require('express')
const router = express.Router();
const User = require('../Models/User.model');


router.post("/signup",async (req,res) =>{
    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success:true});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})
