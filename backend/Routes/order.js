const express = require("express");
const router = express.Router();
const {placeOrder,getTotalOrders,getUserOrders,updateUserOrder} = require("../Controllers/order")


router.post("/placeorder/:userid",placeOrder);
router.get("/gettotalorders",getTotalOrders);
router.get("/getuserorders/:userid",getUserOrders);
router.patch("/updateuserorder/:orderid",updateUserOrder);
module.exports = router