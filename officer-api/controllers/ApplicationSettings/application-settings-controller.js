const coreController = require("../Core/core-controller");
const openConnection = require("../../services/database");
exports.get = function(object){ return async (req,res) =>{
    const { name } = req.query;

    const sql = `SELECT * FROM ${object} ${
        key ? "WHERE Name = ?" : ""
    }`;
    try {
        const db = await openConnection();
        const rows = await db.all(sql, [name]);
        db.close();
        return res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}}
exports.create = coreController.create
exports.update = coreController.update
exports.delete = coreController.delete