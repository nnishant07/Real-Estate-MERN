const express= require('express');
const { createListing,deleteListing } = require('../Controllers/Listing.controller');
const { verifyUser } = require('../Utils/VerifyUser');
const router = express.Router();

router.post("/create",verifyUser,createListing);
router.delete("/deletelisting/:id",verifyUser,deleteListing);

module.exports=router;