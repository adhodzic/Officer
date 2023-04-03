const openConnection = require("../services/database");

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
            await db.run(insertStmt, element)
        }));
        await db.run("COMMIT");
    }catch(err){
        console.log(err)
        throw new HttpError(err, 500);
    }finally{
        await db.close();
    }
};
