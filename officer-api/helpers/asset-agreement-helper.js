const openConnection = require("../services/database");
const { assetAgreement } = require("../services/PDFGenerator/templates/Agreement document/body-section");
const moment = require("moment/moment");
const { generatePdf } = require("../services/PDFGenerator/pdf-generator");
exports.createAssetAgreement = async function (reason, userId) {
    if (!reason || !userId)
        throw new HttpError("AssetAgreement missis parameters", 500);
    const sql = `INSERT INTO AssetAgreement(Name, Reason, Status, UserId) VALUES('AssetAgreement${Date.now().toString()}','${reason}', 'CREATED', ${userId})`;
    const db = await openConnection();
    try{
        console.log("connection open")
        const scope = await db.run(sql, []);
        return scope;
    }catch(err){
        console.log(err)
        return null
    }finally{
        await db.close();
    }
};

exports.getDataForPDF = async function(id){
    const db = await openConnection();
    const sql = `SELECT * FROM vw_AssetAgreementFull WHERE _id = ?`
    try{
        const data = await db.get(sql,[id])
        return data
    }catch(err){
        throw new HttpError(err, 500)
    }finally{
        await db.close()
    }
}

exports.updateDocumentURL = async function(url,id){
    const db = await openConnection();
    const sql = `UPDATE AssetAgreement SET DocumentURL = ? WHERE _id = ?`
    try{
        const data = await db.run(sql,[url,id])
        return data
    }catch(err){
        throw new HttpError(err, 500)
    }finally{
        await db.close()
    }
}

exports.generatePDFFromData = async function(data){
    const user =
            {
                    FullName: data.FullName,
                    OIB: data.OIB,
                    Address : data.Address
            }
        const agreement = {
            Date: moment().format('DD/MM/YYYY')
        }
        const assets = data.Assets.split(',').map(a => {return {Name: a}});

        const html = assetAgreement(user, agreement, assets, "Zadužnica za opremu", "");
        
        const pdfData = await generatePdf(html, data.Name);
        
        return pdfData
}

exports.createAssetsForAgreement = async function (assetAgreementId, assets) {
    console.log(assetAgreementId, assets);
    if (!assetAgreementId || !assets.length > 0)
        throw new HttpError("AssetAgreement missis parameters", 500);
    const insertStmt = `INSERT INTO AssetAgreementAsset(AssetAgreementId, AssetId) VALUES(?,?);`;
    const values = assets.map((asset) => [assetAgreementId, asset]);

    const db = await openConnection();
    try{
        await db.run("BEGIN TRANSACTION");
        await Promise.all(values.map(async (element) => {
            console.log(element)
            await db.run(insertStmt, element)
        }));
        await createReviewersForAgreement(db,assetAgreementId)
        await db.run("COMMIT");
    }catch(err){
        console.log(err)
        db.run("ROLLBACK")
        throw new HttpError(err, 500);
    }finally{
        await db.close();
    }
};
const createReviewersForAgreement = async function (db,assetAgreementId){
    const selectUsers = `SELECT _id FROM vw_UserRole WHERE RoleName = 'ADMIN'`;
    const reviewers = await db.all(selectUsers);
    const insertStmt = `INSERT INTO AssetAgreementReviewer(AssetAgreementId, ReviewerId) VALUES(?,?);`;
    const values = reviewers.map((reviewer) => [assetAgreementId, reviewer._id]);
    if(values.length <= 0) throw new Error(`No reviewers found for AssetAgreementId: ${assetAgreementId}`)
    await Promise.all(values.map(async (element) => {
        console.log(element)
        await db.run(insertStmt, element)
    }));
};
