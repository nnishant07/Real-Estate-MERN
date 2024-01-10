const express= require('express')
const router = express.Router();
const {verifyUser}=require('../Utils/VerifyUser.js')
const {updateUser} = require('../Controllers/User.controller.js');

router.post('/update/:id',verifyUser,updateUser)

module.exports=router;