import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const EditModal = ({_id, itemname, unitprice, qty, category, setEditModal  }) => {
  const [formType, setFormType] = useState({
    itemname,
    unitprice,
    qty,
    category,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormType((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdate = async() => {
    try {
        const result = await axios.patch(
          `http://localhost:3000/admin/items/updateadmin/${_id}`,
          {
            itemname: formType.itemname,
            unitprice: formType.unitprice,
            qty: formType.qty,
            category: formType.category,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        
        toast.success(result.data.message);
    } catch (error) {
        toast.error(error.message);
    }
    finally{
        setEditModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setEditModal(false);
        }
      }}
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
       
        <h1 className="font-thin tracking-wider text-2xl text-center mb-6 text-[#006411]">
          UPDATE ITEM SET
        </h1>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Item Name */}
          <h1>{_id}</h1>
          <div className="flex flex-col">
            <label htmlFor="itemname" className="text-sm font-light text-gray-700">
              Your Item Name
            </label>
            <input
              type="text"
              id="itemname"
              required
              value={formType.itemname}
              onChange={handleChange}
              className="border-0 border-b-2 focus:border-b-2 border-gray-300 focus:border-[#00ED64] focus:outline-none transition-colors duration-300 py-1 font-thin"
            />
          </div>

          {/* Item Price */}
          <div className="flex flex-col">
            <label htmlFor="unitprice" className="text-sm font-light text-gray-700">
              Your Item Price
            </label>
            <input
              type="number"
              id="unitprice"
              required
              value={formType.unitprice}
              onChange={handleChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#00ED64] focus:border-b-2 focus:outline-none transition-colors duration-300 py-1 font-thin"
            />
          </div>

          {/* Qty */}
          <div className="flex flex-col">
            <label htmlFor="qty" className="text-sm font-light text-gray-700">
              Your Item Qty
            </label>
            <input
              type="number"
              id="qty"
              required
              value={formType.qty}
              onChange={handleChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#00ED64] focus:border-b-2 focus:outline-none transition-colors duration-300 py-1 font-thin"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-light text-gray-700">
              Your Item Category
            </label>
            <input
              type="text"
              id="category"
              required
              value={formType.category}
              onChange={handleChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#00ED64] focus:border-b-2 focus:outline-none transition-colors duration-300 py-1 font-thin"
            />
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="mt-6 py-2 bg-[#00ED64] border border-[#0C5822] rounded-xl hover:rounded-2xl transition-all duration-300 w-full text-white font-semibold"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default EditModal;
