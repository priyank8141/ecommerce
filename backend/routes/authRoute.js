const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/authCheck");

//import controller
const authController = require("../controllers/authController");

router.post("/createupdateuser", authCheck, authController.createorupdateuser);
router.post("/currentuser", authCheck, authController.currentuser);
router.post("/currentadmin", authCheck, adminCheck, authController.currentuser);

module.exports = router;
