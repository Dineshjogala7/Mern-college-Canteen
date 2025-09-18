import React from "react";

import { Trash } from "lucide-react";
import { useCart } from "./Context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, changeQty, deleteItem } = useCart();
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const handleCheckout = async () => {
  try {
    const result = await axios.post(
      `http://localhost:3000/user/orders/placeorder/${userid}`,
      {}, // empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(result.data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

  if (!cartItems || cartItems.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Your cart is empty.</h2>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f1ec] to-white w-full py-24 px-4 md:px-[8rem]">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col gap-6">
        {cartItems.items.map((item) => (
          <div
            key={item.itemid._id}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.itemid.itemUrl || "/placeholder.png"}
                alt={item.itemid.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.itemid.itemname}</h2>
                <p className="text-gray-500">Price: ₹{item.itemid.unitprice}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => changeQty(item.itemid._id, -1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-medium">{item.qty}</span>
              <button
                onClick={() => changeQty(item.itemid._id, 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-semibold">
                ₹{item.itemid.unitprice * item.qty}
              </p>
              <button
                onClick={() => deleteItem(item.itemid._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <div className="text-left ">
          <button className="py-2 px-4 rounded-lg bg-green-400 text-left" onClick={handleCheckout}>Checkout</button>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">
            Total: ₹{cartItems.totalprice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
