const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // userid as _id
  items: [
    {
      itemid: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      qty: { type: Number, required: true }
    }
  ],
  totalprice: { type: Number, default: 0 }
});

module.exports = mongoose.model("Cart", cartSchema);
