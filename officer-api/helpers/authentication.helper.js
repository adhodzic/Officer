const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.authenticate = function(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } catch (err) {
        return null
    }
};

exports.createToken = function (userData){
    return jwt.sign(
        {
            user: userData
        },
        process.env.JWT_SECRET,
        { expiresIn: Number(process.env.TOKEN_TIME) }
    );
}

exports.compareAndCreateToken = async function (userData, storedPassword){
    if(!userData?.Password || !storedPassword) throw new Error('Both passwords must be provided')
    const res = await bcrypt.compare(userData.Password, storedPassword)
    if(!res) return false
    return exports.createToken(userData);
}
