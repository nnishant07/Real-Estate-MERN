const express= require('express');
const { createListing,deleteListing,updateListing,getListing,searchListings } = require('../Controllers/Listing.controller');
const { verifyUser } = require('../Utils/VerifyUser');
const router = express.Router();

router.post("/create",verifyUser,createListing);
router.delete("/deletelisting/:id",verifyUser,deleteListing);
router.post('/updatelisting/:id',verifyUser,updateListing);
router.get('/getlist/:id',getListing)
router.get('/search/searchlistings',searchListings)

module.exports=router;