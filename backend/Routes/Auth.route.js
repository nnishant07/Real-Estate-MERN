const express= require('express')
const router = express.Router();
const {signup, signin,google} = require('../Controllers/Auth.controller.js');


router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);

module.exports=router;