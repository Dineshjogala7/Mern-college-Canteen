import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () =>{
    const navigate = useNavigate();
    const handleLogout =()=>{
        try {
            setLoading(true);
            localStorage.removeItem("token");
            navigate("/login");
            toast.success("Logged Out SuccessFully!!")

        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    }
    const username = localStorage.getItem("username")||'no UserName';
    const userid = localStorage.getItem("userid");
    const [myOrders,setMyOrders] = useState([]);
    const [loading , setLoading] = useState(false)
    const token = localStorage.getItem("token")
    useEffect(()=>{
        const fetchMyOrders = async()=>{
            try {
                setLoading(true);
                const result = await axios.get(`http://localhost:3000/user/orders/getuserorders/${userid}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setMyOrders(result.data.userSummary);
            } catch (error) {
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchMyOrders();
    },[])

    return(
        <div className="min-h-[70vh] bg-gradient-to-b from-[#e8f1ec] to-white w-full py-24 px-4 md:px-[8rem]">
            <div className="flex justify-between items-center">
                <h1 className=" text-green-500 md:text-3xl text-lg tracking-widest font-serif">
                {`hello ${username} `}
            </h1>
            <button  className="bg-red-300  hover:bg-red-500 px-4  py-2 rounded-lg font-thin " onClick={handleLogout}>Logout</button>
            </div>
            <div className="mt-8">
                <h1 className="font-thin md:text-3xl text-lg text-center mb-4">MY ORDERS</h1>
                
                {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="flex items-center gap-3 text-green-600 font-thin text-lg">
                            <svg
                                className="animate-spin h-5 w-5 text-green-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                ></circle>
                                <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            Loading ..
                            </div>
                        </div>
                        ) : (
                        <div className="space-y-6">
  {myOrders.map((order, idx) => (
    <div
      key={idx}
      className="rounded-2xl border border-green-200 bg-white shadow-md p-6 hover:shadow-lg transition"
    >
      {/* Order Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-green-600 font-thin text-lg">
          #{idx + 1} • Date: {new Date(order.orderDate).toLocaleDateString()}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-thin ${
            order.status === "done"
              ? "bg-green-100 text-green-700"
              : order.status === "out for delivery"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Items */}
      <div className="grid gap-4">
        {order.items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-gray-200 pb-3 last:border-none"
          >
            <img
              src={item.itemid.itemUrl}
              alt={item.itemid.itemname}
              className="w-16 h-16 object-cover rounded-xl border border-green-200"
            />
            <div className="flex-1">
              <p className="text-green-700 font-thin">{item.itemid.itemname}</p>
              <p className="text-sm text-gray-500 font-thin">
                Qty: {item.qty} × ₹{item.itemid.unitprice}
              </p>
            </div>
            <div className="text-green-600 font-thin">
              ₹{item.qty * item.itemid.unitprice}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-end mt-4">
        <p className="text-green-700 font-thin text-lg">
          Total: <span className="font-semibold">₹{order.totalprice}</span>
        </p>
      </div>
    </div>
  ))}
</div>

                        )}

            </div>
        </div>
    )
}

export default Profile