const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/auth-middleware.js");
const userControler = require("../controllers/User/user-controller.js");

router.route("/user")
    .all(verifyUser('User'))
    .get(userControler.get())
    .put(userControler.update())
    .delete(userControler.delete());

router.route("/register")
    .post(userControler.register());

router.route("/login")
    .get(userControler.login());
    
module.exports = router;
