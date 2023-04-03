const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/auth-middleware.js");
const assetAgreementControler = require("../controllers/AssetAgreement/asset-agreement-controller");

router
    .route("/asset-agreement")
    .all(verifyUser('AssetAgreement'))
    .get(assetAgreementControler.get('AssetAgreement'))
    .post(assetAgreementControler.create('AssetAgreement'))
    .put(assetAgreementControler.update('AssetAgreement'))
    .delete(assetAgreementControler.delete('AssetAgreement'));
module.exports = router;
