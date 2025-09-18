const Cart  = require("../Models/cart");
const Order = require("../Models/order");
const Sales = require("../Models/sales");


async function placeOrder(req,res) {
    try {
        const {userid} = req.params;
        const cartData = await Cart.findById(userid);
        if(!cartData)return res.status(404).json({message:"You didnt add anything to cart till now !!"});
        if(cartData.items.length===0)return res.status(404).json({message:"Empty Cart"});
        const orderData = new Order({
            userid,
            items:cartData.items,
            totalprice:cartData.totalprice,
        })
        const today = new Date()
        today.setUTCHours(0,0,0,0);
        let salesData = await Sales.findOne({date:today});
        if(!salesData){
            salesData = new Sales({
                date:today,
                totalRevenue:orderData.totalprice,
                totalOrders:1
            })
        }
        else{
            salesData.totalRevenue+=orderData.totalprice;
            salesData.totalOrders+=1;
        }
        await salesData.save()

        await orderData.save();
        return res.json({message:"Ordered Added Successfully!",orderSummary:orderData});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in Ordering !!"})
    }
}

async function getTotalOrders(req,res) {
    try {
        const stDate = new Date();
        stDate.setUTCHours(0,0,0,0);
        const endDate = new Date();
        endDate.setUTCHours(23,59,59,999);
        const totalOrders = await Order.find({}).populate({path:"userid",select:"username , phone"}).populate({path:"items.itemid",select:"itemname unitprice"});
        // orderDate:{$gte:stDate,$lte:endDate}
        if(!totalOrders || totalOrders.length===0)return res.status(404).json({message:"No orders Today Yet!!"})
        return res.json({message:"Orders fecthed Successfully",todayOrders:totalOrders});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in getting Total orders!!"});
    }
}

async function getUserOrders(req,res) {
    try {
        const {userid} = req.params;
        // const stDate = new Date();
        // stDate.setUTCHours(0,0,0,0);
        // const endDate = new Date();
        // endDate.setUTCHours(23,59,59,999);
        // const userOrders = await Order.find({userid,orderDate:{$gte:stDate,$lte:endDate}});
        const userOrders = await Order.find({userid}).sort({ orderDate: -1 }).populate("items.itemid");
        if(!userOrders || userOrders.length===0)return res.status(404).json({message:"User DID nt Ordered Yet"});
        return res.json({message:"Orders fetched successfully!",userSummary:userOrders});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in getting User Orders!!"});
    }
}

async function updateUserOrder(req,res) {
    try {
        const {orderid} = req.params;
        const {orderStatus}= req.body
        const orderData = await Order.findById(orderid)
        if(!orderData)return  res.status(404).json({message:"Couldn't find the Order!!"});
        orderData.status=orderStatus;
        await orderData.save();
        return res.json({message:"Order status updated successfully!!",orderSummary:orderData});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in updating order status!!"});
    }
}


module.exports = {placeOrder,getTotalOrders,getUserOrders,updateUserOrder}