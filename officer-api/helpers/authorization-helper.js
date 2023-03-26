const openConnection = require("../services/database");

const Actions = {
    "POST": "CREATE",
    "GET": "READ",
    "PUT": "UPDATE",
    "DELETE": "DELETE"
}

module.exports = authorize = async function (roleId, method, object) {
    console.log(roleId,method,object)
    if(!roleId || !method || !object) throw new HttpError("Authorization is missing parameters",500)
    const action = Actions[method];
    const sql = `SELECT COUNT(*) as access FROM RolePrivileges WHERE RoleId = ${roleId} and Act = '${action}' and Object = '${object}'`;
    const db = await openConnection();
    const privileges = await db.get(sql, []);
    console.log(sql, privileges)
    return privileges.access > 0;
};
