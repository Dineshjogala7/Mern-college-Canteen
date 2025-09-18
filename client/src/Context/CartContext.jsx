import axios from "axios";
import { toast } from "react-toastify";
import { createContext, useState, useEffect, useContext, useRef } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({ items: [], totalprice: 0 });
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");
  const timersRef = useRef({});

  
  const updateBackend = async (itemId, qty) => {
    try {
      await axios.patch(
        `http://localhost:3000/user/cart/updatecartitem/${userid}`,
        { itemid: itemId, qtyData: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBackendItem = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:3000/user/cart/deletecartitem/${userid}`,
        {
          data: { itemid: itemId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCart = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3000/user/cart/getcartitems/${userid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(result.data.userCart || { items: [], totalprice: 0 });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userid, token]);

  // ---------------- Frontend helpers ----------------
  const deleteItem = (itemId) => {
    // Remove from local state immediately
    setCartItems((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.itemid._id !== itemId),
    }));

    // Delete from backend
    deleteBackendItem(itemId).then(fetchCart); // refresh totalprice from backend
  };

 const changeQty = (itemId, delta) => {
  setCartItems((prev) => {
    let newTotal = 0;

    const updatedItems = prev.items.map((it) => {
      if (it.itemid._id === itemId) {
        // Ensure qty >= 1
        const newQty = Math.max(1, (it.qty || 0) + delta);
        newTotal += newQty * it.itemid.unitprice; // Add to new total
        return { ...it, qty: newQty };
      }
      newTotal += (it.qty || 0) * it.itemid.unitprice; // Add other items
      return it;
    });

    // Debounce backend update
    const newQtyForBackend =
      updatedItems.find((it) => it.itemid._id === itemId)?.qty ?? 1;

    if (timersRef.current[itemId]) clearTimeout(timersRef.current[itemId]);
    timersRef.current[itemId] = setTimeout(async () => {
      await updateBackend(itemId, newQtyForBackend);
      delete timersRef.current[itemId];
      fetchCart(); // Ensure full sync from backend
    }, 3000);

    return { ...prev, items: updatedItems, totalprice: newTotal };
  });
};


  return (
    <CartContext.Provider value={{ cartItems, changeQty, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => useContext(CartContext);

export default CartProvider;
