const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true, // Ensures one document per day
    },
    totalRevenue: {
        type: Number,
        required: true,
        default: 0,
    },
    totalOrders: {
        type: Number,
        default: 0, // Optional: store total orders for the day
    }
});



const Sales = mongoose.model("Sales", saleSchema);

module.exports = Sales;
