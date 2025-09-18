const Item = require("../Models/items");
const cloudinary = require("cloudinary").v2
async function addItem(req,res) {
    try {
        const {itemname , qty , unitprice , category , startTime,endTime} = req.body
        const imageUrl = req.file.path;
        const itemPublicId = req.file.filename
        const found = await Item.findOne({itemname});
        if(found) return res.status(401).json({message:"Item already Added!"});
        const newItem = await Item.create({
            itemname,qty,unitprice,category,availability:{
                startTime,endTime
            },itemUrl:imageUrl,itemPublicId:itemPublicId
        });
        await newItem.save();
        return res.json({message:"Item created successfully",id:newItem._id,itemname});
    } catch (error) {
        console.log(error);
        console.log("error in server adding in controller item");
        return res.status(500).json({message:"Server Error In Adding Item "})
    }
}

async function getItems(req,res) {
    try {
        const {category} = req.params
        let items;
        if(category === "all"){
            items = await Item.find({});
        }
        else{
            items = await Item.find({category});
        }
        return res.json({message:"Items fecthed successfully !",itemsList:items})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error from server in getting the all Items"})
    }
}


async function deleteItem(req, res) {
    try {
        const { itemid } = req.params;

        // 1. Validate if the item exists
        const item = await Item.findById(itemid);
        if (!item) {
            return res.status(404).json({ message: "ITEM NOT FOUND FOR DELETE!!" });
        }

        // 2. Delete image from Cloudinary if it exists
        if (item.itemPublicId) {
            await cloudinary.uploader.destroy(item.itemPublicId);
        }
       
        // 3. Delete item from database
        const deletedItem = await Item.findByIdAndDelete(itemid);

        // 4. Send response
        return res.json({ message: "Item deleted successfully!", ItemData: deletedItem });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error in deleting the Item" });
    }
}


async function updateItemQuantity(req,res) {
    try {
        const {itemid} = req.params;
        const {removeQty} = req.body
        const remove = Number(removeQty)
        const itemData = await Item.findByIdAndUpdate(itemid,{$inc:{
            qty:-remove
        }},{new:true});
        if(!itemData)return res.status(404).json({message:"Message not found",});
        return res.json({message:"upadted successfully!!",itemData:itemData})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error in upadtion qty"})
    }
}
 async function updateItem(req,res) {
    try {
        const {itemid} = req.params;
        const {itemname , qty , unitprice , category } = req.body;
        const itemQty = Number(qty);
        const ItemPrice = Number(unitprice);
        const updatedItem = await Item.findByIdAndUpdate({_id:itemid},{itemname,qty:itemQty,unitprice:ItemPrice,category},{new:true});
        if(!updatedItem)return res.status(404).json({message:"Item Not Found !!"});
        return res.json({message:"Successfully Updated!!",UpdatedData:updatedItem});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in Updating the Item"});
    }
 }

module.exports = {addItem,getItems,deleteItem,updateItemQuantity,updateItem};