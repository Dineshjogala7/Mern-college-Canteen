import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditModal from "./EditModal";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading,setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [openIndex, setOpenIndex] = useState(null); // Track which card is open
  const [editModal , setEditModal] = useState(false);
    const handleDelete = async () => {
        if (openIndex === null) return toast.error("No item selected!");
        
        try {
            setLoading(true)
            const itemid = items[openIndex]._id;
            console.log(itemid);
            const result = await axios.delete(
            `http://localhost:3000/admin/items/deleteitem/${itemid}`,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                }
            }
            );
            toast.success(result.data.message);

            // Optionally refresh list or remove item locally
            setItems((prev) => prev.filter((_, i) => i !== openIndex));
            setOpenIndex(null);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
        finally{
          setLoading(false)
        }
        };
  useEffect(() => {
    const getItems = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/admin/items/getitems/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(result.data.itemsList);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    getItems();
  }, [token]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); 
    // If clicked again, close it
  };

  return (
    <div className="min-h-screen w-full bg-[#e8f1ec] py-16">
      <h1 className="font-thin tracking-wider text-3xl text-center mt-8 mb-6">
        Total Items
      </h1>

      <div className="flex flex-wrap justify-center gap-4 px-4">
        {editModal && openIndex!=null && items[openIndex] && <EditModal {...items[openIndex]} setEditModal={setEditModal}/>}
        {items.length === 0 ? (
          <div className="text-center text-gray-700">
            <h1 className="text-lg font-thin">
              Oops! You have not added anything yet.
            </h1>
          </div>
        ) : (
          items.map((item, idx) => (
            <div
              key={idx}
              className="w-48 border border-green-600 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Toggle Button */}
              <button
                className={`absolute right-1 px-2 py-0 rounded-full font-bold bg-white text-black transition-all duration-300 ${
                  openIndex === idx
                    ? "top-0 -translate-y-2"
                    : "top-1 translate-y-0"
                }`}
                onClick={() => handleToggle(idx)}
              >
                {openIndex === idx ? "x" : ":"}
              </button>

              {/* Dropdown Menu */}
              {openIndex === idx && (
                <div className="absolute top-3 right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-200">
                  <button className="w-full text-sm py-2 px-3 text-left rounded-t-lg hover:bg-green-100 text-green-700" onClick={()=>setEditModal(!editModal)}  >
                    EDIT
                  </button>
                  <button className="w-full text-sm py-2 px-3 text-left rounded-b-lg hover:bg-red-100 text-red-700" onClick={handleDelete} disabled={loading}>
                    {loading ? "WAIT..." : "DELETE"}
                  </button>
                </div>
              )}

              {/* Item Image */}
              <img
                src={item.itemUrl}
                alt={item.itemname}
                className="w-full h-32 object-cover rounded-md"
              />

              {/* Item Info */}
              <div className="px-4 py-3 bg-white rounded-2xl shadow-md border border-gray-100">
                <div className="space-y-2">
                  <p className="text-base font-bold text-gray-800">{item.itemname}</p>
                  <p className="text-base font-semibold text-gray-800">
                    ₹{item.unitprice}
                    <span className="text-sm text-gray-500 font-light ml-1">
                      per unit
                    </span>
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      item.qty > 5 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.qty > 5
                      ? `In Stock: ${item.qty}`
                      : `Only ${item.qty} left!`}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Category:</span>{" "}
                    {item.category}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
