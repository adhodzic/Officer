const { AssetModel } = require("../../models/Asset.js");

exports.get = function () {
    return (req, res) => {
        const query = req.query;
        console.log(query)
        AssetModel.find({...query}, (err, docs) => {
            if (docs === null) return res.status(401).json({Message:"Asset not found"});
            if (err) return res.status(500).json({ err: err });
            
            res.status(200).json(docs)
        });
    };
};

exports.create = function () {
    return (req, res) => {
        const data = req.body

        const newAsset = new AssetModel(data);

        newAsset.save(function (err) {
            console.log(err);
            if (err) return res.json({ err: err });
            res.status(200).json(newAsset)
        });
    };
};

exports.update = function () {
    return async (req, res) => {
        const {_id, ...data} =  req.body.data;
        
        const result = await AssetModel.findOneAndUpdate({_id: _id}, data);
        return res.status(200).json(result)
    }
}

exports.delete = function (){
    return async (req, res) =>{
        const _ids = req.body.data; 
        console.log(req.body)
        let docs = await AssetModel.deleteMany({_id: {$in: _ids}});

        if(!docs) return res.status(400).json({message: `No Users found`})
        return res.status(200).json(docs)
    }
}