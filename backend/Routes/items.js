const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/uploads");
const {addItem,getItems,deleteItem,updateItemQuantity,updateItem} = require("../Controllers/items")
router.post("/additem",upload.single("itemImage"),addItem);
router.get("/getitems/:category/",getItems);
router.delete("/deleteitem/:itemid",deleteItem);
router.patch("/update/:itemid",updateItemQuantity);
router.patch("/updateadmin/:itemid",updateItem);
module.exports = router;