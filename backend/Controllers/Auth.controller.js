const User = require('../Models/User.model.js');
const bcrypt = require('bcrypt');
const errorHandler = require('../Utils/Error.js');

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

module.exports = {signup};