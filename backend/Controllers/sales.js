const Sales = require("../Models/sales");

async function getMonthlySales(req,res) {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1); 
        startOfMonth.setHours(0, 0, 0, 0); 

        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0); 
        endOfMonth.setHours(23, 59, 59, 999);

        const data = await Sales.find({
        date: {
            $gte: startOfMonth,
            $lte: endOfMonth,
        }
        }).sort({ date: 1 });
        return res.json({message:"Data fetched successfully!",salesData:data});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error in getting Sales!!"})
    }
}
module.exports = {getMonthlySales}