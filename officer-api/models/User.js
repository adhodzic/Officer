//Require Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Username: {type: String, required: true, index: { unique: true}},
  Password: {type: String, required: true},
  FullName: {type: String},
  Role: {type: String, required: true}
},
{
    timestamps: true
}
);

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('Password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.Password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.Password = hash;
            next();
        });
    });
});

exports.UserModel = mongoose.model('User', UserSchema );