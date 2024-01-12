const express= require('express');
const { createListing } = require('../Controllers/Listing.controller');
const { verifyUser } = require('../Utils/VerifyUser');
const router = express.Router();

router.post("/create",verifyUser,createListing);

module.exports=router;