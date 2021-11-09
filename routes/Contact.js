const express = require("express");
const router = express.Router();
const checkAuthentication = require('../middleware/authentication')

const {registerUserContact,logInContact,getContactById,deleteContactById,getPaginationResults,getAllContacts,updateContact} = require('../controllers/ContactController')
//post routes
router.post("/register",registerUserContact );
router.post("/login",logInContact );
//get routes
router.get("/:contactId",getContactById );
router.get("/",getAllContacts );
//delete route
router.delete("/:contactId",deleteContactById );
//update route
router.patch("/:contactId", checkAuthentication,updateContact);

router.get("/pagination",getPaginationResults );



module.exports = router; 
