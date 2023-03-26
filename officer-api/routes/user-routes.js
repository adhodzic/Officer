const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/auth-middleware.js");
const coreControler = require("../controllers/Core/core-controller.js");

router.route("/user")
    .all(verifyUser('User'))
    .get(coreControler.get('User'))
    .put(coreControler.update('User'))
    .delete(coreControler.delete('User'));
    
module.exports = router;
