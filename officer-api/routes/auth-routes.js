const express = require("express");
const router = express.Router();
const authControler = require("../controllers/Auth/auth-controller.js");

router.route("/register")
    .post(authControler.authentication());

router.route("/login")
    .get(authControler.authentication());
    
module.exports = router;
