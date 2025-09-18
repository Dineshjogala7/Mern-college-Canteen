import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orderType, setOrderType] = useState("all");
  const [orders, setOrders] = useState([]); // Original data
  const [filteredOrders, setFilteredOrders] = useState([]); // Filtered data
  const [statusUpdates, setStatusUpdates] = useState({}); // Track selected status
  const [loading, setLoading] = useState(false);

  // Fetch Orders on Mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          "http://localhost:3000/admin/orders/gettotalorders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const allOrders = result.data.todayOrders || [];
        setOrders(allOrders);
        setFilteredOrders(allOrders);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Watch for orderType changes and filter
  useEffect(() => {
    if (orderType === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === orderType));
    }
  }, [orderType, orders]);

  // Handle status change in dropdown
  const handleSelectChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  // Handle API call to update status
  const handleStatusChange = async (orderId) => {
    const status = statusUpdates[orderId];
    if (!status) {
      toast.error("Please select a status before updating.");
      return;
    }

    try {
      const result = await axios.patch(
        `http://localhost:3000/admin/orders/updateuserorder/${orderId}`,
        { orderStatus: status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(result.data.message);

      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status } : order
      );

      setOrders(updatedOrders);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#e8f1ec] py-16 px-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center border-b-2 border-gray-500 pb-4 md:mt-8 mt-9">
        <h1 className="font-thin tracking-wider text-3xl">
          Total Orders /{" "}
          <span className="capitalize text-[#00ED64]">{orderType}</span>
        </h1>

        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="py-2 px-4 border border-gray-500 rounded-lg focus:outline-none focus:border-[#00ED64] font-thin text-gray-700 cursor-pointer"
        >
          <option value="all">All</option>
          <option value="preparing">Preparing</option>
          <option value="out for delivery">Out for Delivery</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Orders */}
      <div className="mt-8 max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="max-w-md mx-auto text-2xl text-center text-gray-600">
            No Orders Yet !!
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {order.userid.username} - {new Date(order.orderDate).toISOString().slice(0, 16).replace("T", " ")}
                  </h2>
                  <p className="text-gray-600">{order.userid.phone}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={statusUpdates[order._id] || order.status}
                    onChange={(e) =>
                      handleSelectChange(order._id, e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-green-300"
                  >
                    <option value="preparing">Preparing</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="done">Done</option>
                  </select>
                  <button
                    onClick={() => handleStatusChange(order._id)}
                    className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Order Table */}
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border">Item Name</th>
                    <th className="py-2 px-4 border">Unit Price</th>
                    <th className="py-2 px-4 border">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id} className="text-center">
                      <td className="py-2 px-4 border">
                        {item.itemid.itemname}
                      </td>
                      <td className="py-2 px-4 border">
                        Rs: {item.itemid.unitprice}/-
                      </td>
                      <td className="py-2 px-4 border">{item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-right mt-4 font-semibold text-lg text-gray-700">
                Total: Rs: {order.totalprice}/-
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
