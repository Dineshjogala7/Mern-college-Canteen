const  mongoose = require("mongoose");

const MongooseConnect = (url)=>{
    return mongoose.connect(url)
}

module.exports = MongooseConnect;