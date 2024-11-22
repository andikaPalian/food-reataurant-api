const express = require("express");
const {registerAccount, loginAccount} = require("../controllers/authControllers");
const router = express.Router();

// REGISTER || POST
router.post("/register", registerAccount);

// LOGIN || POST
router.post("/login", loginAccount);

module.exports = router;