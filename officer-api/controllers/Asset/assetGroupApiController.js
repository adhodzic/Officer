const { AssetGroupModel } = require("../../models/AssetGroup.js");

exports.get = function () {
    return (req, res) => {
        const query = req.query;
        console.log(query)
        AssetGroupModel.find({...query}, (err, docs) => {
            if (docs === null) return res.status(401).json({Message:"Asset Group not found"});
            if (err) return res.status(500).json({ err: err });
            
            res.status(200).json(docs)
        });
    };
};

exports.create = function () {
    return (req, res) => {
       const data = req.body

        const newAssetGroup = new AssetGroupModel(data);

        newAssetGroup.save(function (err) {
            console.log(err);
            if (err) return res.json({ err: err });
            res.status(200).json(newAssetGroup)
        });
    };
};

exports.update = function () {
    return async (req, res) => {
        const {_id, ...data} =  req.body.data;
        
        const result = await AssetGroupModel.findOneAndUpdate({_id: _id}, data);
        return res.status(200).json(result)
    }
}

exports.delete = function (){
    return async (req, res) =>{
        const _ids = req.body.data; 

        let docs = await AssetGroupModel.deleteMany({_id: {$in: _ids}});

        if(!docs) return res.status(400).json({message: `No Asset Group/s found`})
        return res.status(200).json(docs)
    }
}