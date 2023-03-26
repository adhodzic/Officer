const openConnection = require("../../services/database");
const authHelper = require("../../helpers/authentication-helper");

exports.get = function () {
    return async (req, res) => {
        const { _id } = req.query;
        const sql = `SELECT * FROM vw_UserRole ${
            _id ? "WHERE _id = " + _id : ""
        }`;
        try {
            const db = await openConnection();
            const rows = await db.get(sql, []);
            db.close();
            return res.status(200).json(rows || {});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };
};

exports.update = function () {
    return async (req, res) => {
        const { _id, ...data } = req.body.data;

        let fields = Object.entries(data).map((field) => {
            return `${field[0]} = '${field[1]}'`;
        });
        let sql = `UPDATE User SET ${fields.join(
            ", "
        )} WHERE User._id = ${_id}`;
        console.log(sql);
        try {
            const db = await openConnection();
            const rows = await db.run(sql, []);
            db.close();
            console.log(rows);
            return res.status(200).json(rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };
};

exports.delete = function () {
    return async (req, res) => {
        const _ids = req.body.data;
        const sql = `DELETE FROM User WHERE _id IN (${_ids})`;
        try {
            const db = await openConnection();
            const rows = await db.run(sql, []);
            db.close();
            return res.status(200).json(rows || {});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };
};
//route: /register
exports.register = function () {
    return async (req, res) => {
        if (!req.body.Username || !req.body.Password) {
            return res
                .status(400)
                .json({
                    Message:
                        "Invalid data for login. Make sure that body is JSON Object and it contains username and password keys",
                });
        }

        const { Username, Password } = req.body;

        const passwordHash = await authHelper.hashPasssword(Password);
        if (!passwordHash)
            return res
                .status(500)
                .json({
                    err: "Internal service error: Could not create password hash",
                });
        const sql = `INSERT INTO User(${fields}, Username, Password, Email, RoleId) VALUES('${values}', '${Username}', '${passwordHash}', 'adnan.hodzic@unipu.hr',1)`;
        const getUser = `SELECT * FROM vw_UserRole WHERE Username = '${Username}'`;
        try {
            const db = await openConnection();
            await db.run(sql, []);
            const userData = await db.get(getUser, []);
            db.close();
            let newUser = { Username, userData };
            let newToken = authHelper.createToken(newUser);
            return res.status(200).json({
                Token: newToken,
                User: userData,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };
};
