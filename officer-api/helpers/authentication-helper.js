const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.hashPasssword = async function(password){
    try{
        const hash = await bcrypt.hash(password, 10);
        return hash
    }catch(err){
        console.log(err)
    }
}

exports.authenticate = function(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } catch (err) {
        throw new HttpError('Invalid or missing authorization token',401)
    }
};

exports.createToken = function (user){
    return jwt.sign(
        {
            ...user
        },
        process.env.JWT_SECRET,
        { expiresIn: Number(process.env.TOKEN_TIME) }
    );
}

exports.compareAndCreateToken = async function (userData,password, storedPassword){
    if(!password || !storedPassword) throw new Error('Both passwords must be provided')
    const res = await bcrypt.compare(password, storedPassword)
    if(!res) return false
    return exports.createToken(userData);
}
