const User = require("../Models/User.model.js");
const Listing = require("../Models/Listing.model.js");
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

const deleteUser=async (req,res,next)=>{

    if(req.user.id!==req.params.id){
        return next(errorHandler(401,"You can only delete your own account"))
    }

    try{
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('authToken');
        res.status(200).json('User has been deleted')
    }catch(error){
        next(error)
    }
}

const getUserListings = async (req,res,next) => {
    if(req.user.id!==req.params.id){
        return next(errorHandler(401,"You can only view your own listing"))
    }
    
    try{
        const listings = await Listing.find({userRef: req.params.id});
        res.status(200).json(listings);
    }catch(error){
        next(error)
    }
}

const getUser = async (req,res,next) =>{

    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return next(errorHandler(404,'User not found'));
        }

        const {password: pass, ...rest} = user._doc;
        res.status(200).json(rest);
    }catch(error){
        next(error);
    }
    
}
module.exports = {updateUser,deleteUser,getUserListings,getUser};