//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const AssetGroupSchema = new Schema({
  Name: {type: String, required: true, index: { unique: true}},
  Description: {type: String}
},
{
    timestamps: true
}
);

exports.AssetGroupModel = mongoose.model('AssetGroup', AssetGroupSchema );