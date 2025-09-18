const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[
        {
            itemid:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Item",
                required:true
            },
            qty:{type:Number,required:true},
        }
    ],
    totalprice:{type:Number,default:0,},
    status:{
        type:String,
        enum:["preparing","out for delivery","done"],
        default:"preparing"
    },
    orderDate:{
        type:Date,
        default: Date.now
    },
    payment:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;
