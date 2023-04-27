const coreController = require("../Core/core-controller");
const assetHelper = require("../../helpers/asset-agreement-helper");
const path = require('path')
exports.get = coreController.get
exports.create = function(){ return async (req,res) =>{
    const {Assets, Reason, userData} = req.body;
    console.log('Create agreement')
    try{
        const scope = await assetHelper.createAssetAgreement(Reason, userData._id);
        await assetHelper.createAssetsForAgreement(scope.lastID, Assets);
        return res.status(200).json({scope})
    }catch(err){
        console.log(err)
        return res.status(err?.statusCode || 500).json(err.message || err)
    }
}}
exports.update = coreController.update
exports.delete = coreController.delete

exports.pdf = function(){
    return async (req, res) => {
        const {_id} = req.query;
        
        const data = await assetHelper.getDataForPDF(_id);

        if(data.DocumentURL == null){
            const pdfData = await assetHelper.generatePDFFromData(data)
            console.log(pdfData)
            req.body.URL = pdfData.path;
            await assetHelper.updateDocumentURL(pdfData.path, _id);
        }
        
        var filePath = data.DocumentURL || req.body.URL
        console.log(data, req.body.URL)
        var fileName = path.basename(filePath);
    
        res.setHeader('Content-type', 'application/pdf');
        res.download(filePath,fileName)
    }
}
exports.signPdf = function(){
    return async (req, res) => {
        const {id} = req.body;
    }
}