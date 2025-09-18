const express = require("express");
const {addCartItem,updateCartItemQuantity,deleteCartItem,getCartItems} = require("../Controllers/cart");



const router = express.Router();

router.post("/addcartitem/:userid",addCartItem);
router.patch("/updatecartitem/:userid",updateCartItemQuantity);
router.delete("/deletecartitem/:userid",deleteCartItem)
router.get("/getcartitems/:userid",getCartItems);
module.exports = router;

