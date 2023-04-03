const coreController = require("../Core/core-controller");
const assetHelper = require("../../helpers/asset-agreement-helper")
exports.get = coreController.get
exports.create = function(){ return async (req,res) =>{
    const {Assets, Reason, userData} = req.body;
    console.log('Create agreement')
    try{
        const scope = await assetHelper.createAssetAgreement(Reason, userData._id)
        const assetsAgreement = await assetHelper.createAssetsForAgreement(scope.lastID, Assets)
        return res.status(200).json({assetsAgreement})
    }catch(err){
        return res.status(err.statusCode).json(err.message)
    }
}}
exports.update = coreController.update
exports.delete = coreController.delete