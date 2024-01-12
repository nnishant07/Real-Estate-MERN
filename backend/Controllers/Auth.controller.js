const User = require('../Models/User.model.js');
const bcrypt = require('bcrypt');
const errorHandler = require('../Utils/Error.js');
const jwt = require('jsonwebtoken');
const jwtSecret=process.env.TOKEN;

const signup = async (req,res,next) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);

        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
        })
        res.json({success:true});
    } catch (error) {
        next(error);
    }
}

const signin = async (req,res,next) =>{
    try {
        let email=req.body.email;
        let password=req.body.password;

        let userData=await User.findOne({email});
        if(!userData){
            return next(errorHandler(404,'User Not Found!'))
        }
        
        const pwdCompare = await bcrypt.compare(password,userData.password);
        if(!pwdCompare){
            return next(errorHandler(401,'Incorrect Password!'))
        }
        
        const {password: pass,...rest} = userData._doc;
        const authToken = jwt.sign({id: userData._id},jwtSecret);
        res.cookie('authToken',authToken,{httpOnly: true}).status(200).json(rest)
        //res.json({success:true,authToken:authToken});
        //console.log('Cookies Set:', res.getHeaders()['set-cookie']);
        
    } catch (error) {
        next(error);
    }
}

const google = async (req,res,next)=>{
    try{
        const userData= await User.findOne({email: req.body.email})

        if(userData){
            const {password: pass,...rest} = userData._doc;
            const authToken = jwt.sign({id: userData._id},jwtSecret);
            res.cookie('authToken',authToken,{httpOnly: true}).status(200).json(rest)
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(generatedPassword,salt);

            const newUser= await User({
                name: req.body.name.split(' ').join('').toLowerCase() +
                Math.random().toString(36).slice(-4),
                password: secPassword,
                email: req.body.email,
                avatar: req.body.photo
            })
            await newUser.save();

            const authToken = jwt.sign({id: newUser._id},jwtSecret);
            const {password: pass,...rest} = newUser._doc;
            res.cookie('authToken',authToken,{httpOnly: true}).status(200).json(rest)
        }
    }
    catch(error){
        next(error)
    }
}
module.exports = {signup,signin,google};