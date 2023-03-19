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
    .post(verifyUser(ROLES.Admin, ROLES.User), assetGroupControler.create())
    .put(verifyUser(ROLES.Admin, ROLES.User), assetGroupControler.update())
    .delete(verifyUser(ROLES.Admin, ROLES.User), assetGroupControler.delete());

router
    .route("/asset/group/delete")
    .get(verifyUser(ROLES.Admin, ROLES.User), assetGroupControler.cascadeDeleteInfo())

module.exports = router;
