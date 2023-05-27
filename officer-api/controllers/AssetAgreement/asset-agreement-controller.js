const coreController = require("../Core/core-controller");
const assetHelper = require("../../helpers/asset-agreement-helper");
const path = require('path')
const {createSignablePDF} = require('../../services/DocuSignAPI/docusign.js')
exports.get = coreController.get
exports.create = function(){ return async (req,res) =>{
    const {Assets, Reason, userData} = req.body;
    console.log('Create agreement')
    const name = 'AssetAgreemnt' + Date.now().toString()
    try{
        const assetAgreementObj = {
            Name: name,
            FullName: userData.FullName,
            OIB: userData.OIB,
            Address: userData.Address,
            Assets: Assets
        }
        const reviewers = await assetHelper.getReviewersForAgreement();
        //Check if user who initiated agreement is one of the reviewers. If not add it.
        if(!reviewers.some((reviewer)=>{return reviewer._id == userData._id})){
            reviewers.push({_id: userData._id,Email:userData.Email, FullName: userData.FullName, Position: userData.Position})
        }
        const pdfData = await assetHelper.generatePDFFromData(assetAgreementObj, reviewers)
        const scope = await assetHelper.createAssetAgreement(name, Reason, userData._id, pdfData.path);
        await assetHelper.createReviewersForAgreement(scope.lastID,reviewers)
        await assetHelper.createAssetsForAgreement(scope.lastID, Assets);
        const {envelopeId, envelopeUrl} = await createSignablePDF(userData,pdfData.path, reviewers, {_id: scope.lastID, name})
        await assetHelper.assignEnvelopeToAssetAgreement(envelopeId,scope.lastID)
        return res.status(200).json({scope, envelopeUrl})
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

        if(data.DocumentURL == ''){
            const pdfData = await assetHelper.generatePDFFromData(data)
            console.log(pdfData)
            req.body.URL = pdfData.path;
            await assetHelper.updateDocumentURL(pdfData.path, _id);
        }
        
        var filePath = data.DocumentURL || req.body.URL
        console.log(data, data.DocumentURL)
        var fileName = path.basename(filePath);
    
        res.setHeader('Content-type', 'application/pdf');
        res.download(filePath,fileName)
    }
}
exports.signPdf = function(){
    return async (req, res) => {
        const {id, userData} = req.body;
        await assetHelper.updateReviewStatus(id,userData._id)

        return res.status(200).json({"message":"OK"})
    }
}