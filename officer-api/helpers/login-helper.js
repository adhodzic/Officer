const openConnection = require("../services/database");
const authHelper = require("../helpers/authentication-helper")
const getUserByUsername = async function (Username) {
    const sql = `SELECT * FROM User WHERE Username = '${Username}'`;
    const db = await openConnection();
    const userData = await db.get(sql, []);
    db.close();
    return userData;
};

const getUserFromDb = async function (Username) {
    const sql = `SELECT * FROM vw_UserRole WHERE Username = '${Username}'`;
    const db = await openConnection();
    const userData = await db.get(sql, []);
    db.close();
    return userData;
};

const validateEmployee = async function (Email) {
    const sql = `SELECT * FROM Employee WHERE Email = '${Email}'`;
    const db = await openConnection();
    const employee = await db.get(sql, []);
    db.close();
    return employee?._id;
};

const assignEmployeeToUser = async function (EmployeeId, UserId) {
    const sql = `UPDATE User SET EmployeeId = ${EmployeeId} WHERE User._id = '${UserId}'`;
    const db = await openConnection();
    await db.run(sql, []);
    db.close();
};

const getRoleByName = async function (roleName) {
    const sql = `SELECT Role._id FROM Role WHERE Role.RoleName = '${roleName}'`;
    const db = await openConnection();
    const role = await db.get(sql, []);
    db.close();
    return role?._id;
};

const createUser = async function (Username, Password, employeeId, roleName) {
    const passwordHash = await authHelper.hashPasssword(Password);
    if (!passwordHash) throw new HttpError("Unable to hash password", 500);
    const roleId = await getRoleByName(roleName);

    const sql = `INSERT INTO User(Username, Password, RoleId, EmployeeId) VALUES('${Username}', '${passwordHash}', ${roleId}, ${employeeId})`;
    const db = await openConnection();
    await db.run(sql, []);
    const userData = await getUserByUsername(Username);
    await assignEmployeeToUser(employeeId, userData._id)
    db.close();
    return userData
};

module.exports = {
    getUserByUsername,
    getUserFromDb,
    validateEmployee,
    assignEmployeeToUser,
    createUser
};
