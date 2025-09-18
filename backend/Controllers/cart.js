const Cart = require("../Models/cart");
const Item = require("../Models/items");

// Helper: recalculate total price from cart items
async function recalcTotal(cartData) {
  await cartData.populate("items.itemid"); // populate to get unitprice
  cartData.totalprice = cartData.items.reduce((acc, curr) => {
    const qty = curr.qty > 0 ? curr.qty : 0;
    const price = curr.itemid?.unitprice || 0;
    return acc + qty * price;
  }, 0);

  // Remove items with qty <= 0
  cartData.items = cartData.items.filter(it => it.qty > 0);
}

async function addCartItem(req, res) {
  try {
    const { userid } = req.params;
    const { itemid, qtyData } = req.body;
    const qtyDat = Number(qtyData);

    if (qtyDat <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    const itemData = await Item.findById(itemid);
    if (!itemData) return res.status(404).json({ message: "Item not found" });

    let cartData = await Cart.findById(userid);
    if (!cartData) {
      // Create new cart
      cartData = new Cart({ _id: userid, items: [{ itemid, qty: qtyDat }] });
    } else {
      const existingItem = cartData.items.find(i => i.itemid.toString() === itemid);
      if (existingItem) existingItem.qty += qtyDat;
      else cartData.items.push({ itemid, qty: qtyDat });
    }

    await recalcTotal(cartData);
    await cartData.save();

    return res.json({ message: "Cart updated successfully!", cart: cartData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error in addCartItem" });
  }
}

async function updateCartItemQuantity(req, res) {
  try {
    const { userid } = req.params;
    const { itemid, qtyData } = req.body;
    const qtyDat = Number(qtyData);

    if (qtyDat < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    const cartData = await Cart.findById(userid);
    if (!cartData) return res.status(404).json({ message: "Cart not found" });

    const item = cartData.items.find(i => i.itemid.toString() === itemid);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.qty = qtyDat;

    await recalcTotal(cartData);
    await cartData.save();

    return res.json({ message: "Cart item updated successfully!", cart: cartData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error in updateCartItemQuantity" });
  }
}

async function deleteCartItem(req, res) {
  try {
    const { userid } = req.params;
    const { itemid } = req.body;

    if (!userid || !itemid) return res.status(400).json({ message: "User ID and Item ID are required" });

    const cartData = await Cart.findById(userid);
    if (!cartData) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cartData.items.findIndex(i => i.itemid.toString() === itemid);
    if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

    const deletedItem = cartData.items.splice(itemIndex, 1);

    await recalcTotal(cartData);
    await cartData.save();

    return res.json({ message: "Item deleted successfully", itemData: deletedItem[0], cart: cartData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error in deleteCartItem" });
  }
}

async function getCartItems(req, res) {
  try {
    const { userid } = req.params;
    const cartData = await Cart.findById(userid).populate("items.itemid");

    if (!cartData || cartData.items.length === 0) {
      return res.status(200).json({ message: "Cart is empty", userCart: { items: [], totalprice: 0 } });
    }

    return res.json({ message: "Cart fetched successfully", userCart: cartData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error in getCartItems" });
  }
}

module.exports = { addCartItem, updateCartItemQuantity, deleteCartItem, getCartItems };
