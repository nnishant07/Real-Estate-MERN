const User = require('../Models/User.model.js');
const bcrypt = require('bcrypt');

const signup = async (req,res) =>{
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
        console.log(error)
        res.json({success:false});
    }
}

module.exports = {signup};