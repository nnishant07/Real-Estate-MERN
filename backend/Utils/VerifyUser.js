const errorHandler = require('../Utils/Error.js');
const jwt = require('jsonwebtoken');

const verifyUser = (req,res,next)=>{
    const token= req.cookies.authToken;
    
    console.log(token);
    if(!token){
        return next(errorHandler(401,"Unauthorized"))
    }
    jwt.verify(token,process.env.TOKEN,(err,user)=>{
        if(err) return next(errorHandler(403,"Forbidden"))

        req.user=user;
        next();
    })
    
}


module.exports={verifyUser};