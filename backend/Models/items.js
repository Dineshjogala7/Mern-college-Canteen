const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemname: {
        type: String,
        required: true,
        unique: true
    },
    qty: {
        type: Number,
        required: true
    },
    unitprice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availability: {   // fixed typo: availbility -> availability
        startTime: { type: String,default:"10:00" },
        endTime: { type: String ,default:"10:00"}
    },
    itemUrl: {   
        type: String,
        required: true // make it required if every item must have an image
    },
    itemPublicId:{
        type:String,
        required:true
    }
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
