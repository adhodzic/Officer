const mongoose = require('mongoose')

exports.dbConnect = function () {
    try {
        if(mongoose.connection.readyState === mongoose.STATES.disconnected){
            const uri = process.env.DB_URI;
            if(!uri) throw new Error("Could not load DB Uri from env file");
            // Connect to the MongoDB cluster
            mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
            console.log("DB Successfuly connected")
            const db = mongoose.connection;

            db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        }

        return mongoose.connection

    } catch (e) {
        console.error(e);
    }
};
