const authHelper = require("../../helpers/authentication-helper");
const {getUserFromDb, getUserByUsername, validateEmployee, createUser} = require('../../helpers/login-helper.js')

exports.authentication = function () {
    return async (req, res) => {
        if (!req.query.Username || !req.query.Password) {
            return res
                .status(400)
                .json({
                    Message:
                        "Invalid data for login. Make sure that body is JSON Object and it contains username and password keys",
                });
        }
        const { Username, Password, Email } = req.query;
        try {
            let userData = await getUserByUsername(Username);

            if(userData === undefined){
                if(!Email) throw new HttpError(`There is no user with username: ${Username}`)
                const employeeId = await validateEmployee(Email);
                if(employeeId === undefined) throw new HttpError(`Could not find employee with email: ${Email}`, 401);
                userData = await createUser(Username, Password, employeeId, 'EMPLOYEE')
            }
            const userFullData = await getUserFromDb(Username);
            const newToken = await authHelper.compareAndCreateToken(
                userFullData,
                Password,
                userData?.Password
            );
            return res.status(200).json({
                Token: newToken,
                User: userFullData,
            });
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json(err.message);
        }
    };
};