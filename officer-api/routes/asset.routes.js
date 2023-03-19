const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/auth.js");
const ROLES = require("../config/roles_list.js");
const assetControler = require("../controllers/Asset/assetApiController")
const assetGroupControler = require("../controllers/Asset/assetGroupApiController")

router
    .route("/asset")
    .get(verifyUser(ROLES.Admin, ROLES.User), assetControler.get())
    .post(verifyUser(ROLES.Admin, ROLES.User), assetControler.create())
    .put(verifyUser(ROLES.Admin, ROLES.User), assetControler.update())
    .delete(verifyUser(ROLES.Admin, ROLES.User), assetControler.delete());

router
    .route("/asset/group")
    .get(verifyUser(ROLES.Admin, ROLES.User), assetGroupControler.get())
    .post(verifyUser(ROLES.Admin), assetGroupControler.create())
    .put(verifyUser(ROLES.Admin), assetGroupControler.update())
    .delete(verifyUser(ROLES.Admin), assetGroupControler.delete());

module.exports = router;
