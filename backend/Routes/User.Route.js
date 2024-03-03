const express= require('express')
const router = express.Router();
const {verifyUser}=require('../Utils/VerifyUser.js')
const {updateUser, deleteUser,getUserListings,getUser} = require('../Controllers/User.controller.js');

router.post('/update/:id',verifyUser,updateUser)
router.delete('/delete/:id',verifyUser,deleteUser)
router.get('/listing/:id',verifyUser,getUserListings)
router.get('/:id',verifyUser,getUser)

module.exports=router;