const express= require('express')
const router = express.Router();
const {verifyUser}=require('../Utils/VerifyUser.js')
const {updateUser, deleteUser} = require('../Controllers/User.controller.js');

router.post('/update/:id',verifyUser,updateUser)
router.delete('/delete/:id',verifyUser,deleteUser)

module.exports=router;