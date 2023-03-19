const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/auth.js");
const ROLES = require("../config/roles_list.js");
const userControler = require("../controllers/User/userApiController.js");

router.route("/user")
    .get(verifyUser(ROLES.Admin), userControler.get())
    .put(verifyUser(ROLES.Admin), userControler.update())
    .delete(verifyUser(ROLES.Admin), userControler.delete())

router.route("/register")
    .post(userControler.register());

router.route("/login")
    .post(userControler.login());
    
module.exports = router;
