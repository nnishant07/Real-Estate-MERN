const User = require("../Models/User.model.js");
const errorHandler = require("../Utils/Error");
const bcrypt = require('bcrypt');

const updateUser=async (req,res,next)=>{

    
    if(req.user.id!==req.params.id){
        return next(errorHandler(401,"You can only update your own account"))
    }

    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt); 
        }
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        },{new:true})

        const {password,...rest} = updatedUser._doc

        res.status(200).json(rest)
       

    }catch(error){
        next(error)
    }
}

module.exports = {updateUser};