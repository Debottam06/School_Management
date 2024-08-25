const express = require("express");
const router = express.Router();

//import controller
const {addSchool,listSchools}=require("../controller/School"); 

//mapping create
router.post("/addSchool",addSchool);
router.get("/listSchools",listSchools);

//export
module.exports = router;
