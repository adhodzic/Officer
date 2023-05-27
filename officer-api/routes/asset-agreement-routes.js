const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/auth-middleware.js");
const assetAgreementControler = require("../controllers/AssetAgreement/asset-agreement-controller");

router
    .route("/asset-agreement")
    .all(verifyUser('AssetAgreement'))
    .get(assetAgreementControler.get('vw_AssetAgreementFull'))
    .post(assetAgreementControler.create('AssetAgreement'))
    .put(assetAgreementControler.update('AssetAgreement'))
    .delete(assetAgreementControler.delete('AssetAgreement'));

router
    .route("/asset-agreement/:id")
    .all(verifyUser('AssetAgreement'))
    .get(assetAgreementControler.getDetails())

router
    .route("/asset-agreement/pdf")
    .get(assetAgreementControler.pdf());
router
    .route("/asset-agreement/sign")
    .all(verifyUser('AssetAgreement'))
    .post(assetAgreementControler.signPdf());

module.exports = router;
