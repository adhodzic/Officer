const coreController = require("../Core/core-controller");
const assetHelper = require("../../helpers/asset-agreement-helper");
const { generatePdf } = require("../../services/PDFGenerator/pdf-generator");
const { assetAgreement } = require("../../services/PDFGenerator/templates/Agreement document/body-section");
const moment = require("moment/moment");
const path = require('path')
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

exports.pdf = function(){
    return async (req, res) => {
        const {_id} = req.query;
        
        const {Assets, ...data} = await assetHelper.getDataForPDF(_id);
        const user =
            {
                    FullName: data.FullName,
                    OIB: data.OIB,
                    Address : data.Address
            }
        const agreement = {
            Date: moment().format('DD/MM/YYYY')
        }
        const assets = Assets.split(',').map(a => {return {Name: a}});

        const html = assetAgreement(user, agreement, assets, "Zadužnica za opremu", "");
        
        const pdfData = await generatePdf(html, `UserAgreement_${_id}`);
        await assetHelper.updateDocumentURL(pdfData.path,_id);
        var filename = path.basename(pdfData.path);
    
        res.setHeader('Content-type', 'application/pdf');
        res.download(pdfData.path,filename)
    }
}