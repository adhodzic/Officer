//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  Name: {type: String, required: true},
  Description: {type: String},
  Label: {type: String, required: true},
  PurchaseDate: {type: String, required: true},
  AssetGroup: {type: Schema.Types.ObjectId, ref: 'AssetGroup', required: true}
},
{
    timestamps: true
}
);

AssetSchema.index({ Label: 1}, { unique: true });

exports.AssetModel = mongoose.model('Asset', AssetSchema );