const { UserModel } = require("../../models/User.js");
const authHelper = require("../../helpers/authentication.helper")

//route: /users
exports.get = function () {
    return (req, res) => {
        const query = req.query;
        console.log(query)
        UserModel.find({...query}, (err, docs) => {
            if (docs === null) return res.status(401).json({Message:"User not found"});
            if (err) return res.status(500).json({ err: err });
            
            res.status(200).json(docs)
        });
    };
};

exports.update = function () {
    return async (req, res) => {
        const {_id, ...data} =  req.body.data;
        
        const result = await UserModel.findOneAndUpdate({_id: _id}, data);
        return res.status(200).json(result)
    }
}

exports.delete = function (){
    return async (req, res) =>{
        const _ids = req.body.data; 

        let docs = await UserModel.deleteMany({_id: {$in: _ids}});

        if(!docs) return res.status(400).json({message: `No Users found`})
        return res.status(200).json(docs)
    }
}
//route: /register
exports.register = function () {
    return (req, res) => {
        if (!req.body.Username || !req.body.Password) {
            return res.status(400).json({Message:"Invalid data for login. Make sure that body is JSON Object and it contains username and password keys"});
        }

       const {Username, Password, ...data} = req.body

        const newUser = new UserModel({
            Username,
            Password,
            ...data,
            Role: "User",
        });

        newUser.save(function (err) {
            console.log(err);
            if (err) return res.json({ err: err });
            let {Password, ...userData} = newUser;
            let newToken = authHelper.createToken(userData);
            res.json({
                Token: newToken,
                User: newUser
            });
        });
    };
};
//route: /login
exports.login = function () {
    return (req, res) => {
        if (!req.body.Username || !req.body.Password) {
            return res.status(400).json({Message:"Invalid data for login. Make sure that body is JSON Object and it contains username and password keys"});
        }
        const {Username, Password} = req.body;

        UserModel.findOne({ Username }, async (err, docs) => {
            if (docs === null) return res.status(401).json({error: "Invalid username or password"});

            if (err) return res.status(500).json({ err: err });

          
            const newToken = await authHelper.compareAndCreateToken({Username, Password, Role: docs.Role, UserId: docs._id}, docs.Password);
            if(!newToken) return res.status(401).json({error: "Invalid username or password"})
            res.json({
                User: {
                    _id: docs._id,
                    Username: docs.Username,
                    Role: docs.Role,
                    FullName: docs.FullName
                },
                Token: newToken
            });
        });
    };
};
