import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddModal = ({setAddModal}) => {
    const [formType,setFormType] = useState({itemname: "",
    unitprice: 0,
    qty: 0,
    category: "",
    itemImage: null,})
    const [loading , setLoading] = useState(false);
    const handleChange = (e)=>{
        setFormType((prev)=>({
            ...prev,
            [e.target.id]:e.target.value
        }))
    }
    const handleFile = (e)=>{
        setFormType((prev)=>({
            ...prev,
            itemImage:e.target.files[0]
        }))
    }
    const handleSubmit = async()=>{
        try {
            setLoading(true)
            const { itemname, unitprice, qty, category, itemImage } = formType;
        if (!itemname || !unitprice || !qty || !category || !itemImage) {
            toast.error("EVERY FIELD MUST BE PROVIDED!!");
            return;
        }

        const data = new FormData();
        data.append("itemname",itemname)
        data.append("unitprice",unitprice)
        data.append("qty",qty);
        data.append("category",category);
        data.append("itemImage",itemImage);;
        const result = await axios.post("http://localhost:3000/admin/items/additem",data,{
            headers:{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        toast.success(result.data.message);
        setAddModal(false);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        finally{
            setLoading(false)
        }

    }
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50" onClick={(e)=>{
        if(e.target===e.currentTarget){
            setAddModal(false);
        }
        return
    }}>
      <div className="max-w-md w-full rounded-lg bg-white p-6">
        <h1 className="font-thin tracking-wider text-2xl text-center mb-6 text-[#006411]">
          ADD ITEM
        </h1>

        {/* Wrapper for all fields */}
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <label htmlFor="itemName" className="font-thin">Enter Item Name</label>
            <input
              type="text"
              id="itemname"
              placeholder="e.g Biryani"
              value={formType.itemname}
              onChange={handleChange}
              required
              className="border-0 border-b-2 border-gray-300 focus:border-[#00ED64] focus:outline-none transition-colors duration-300 py-1 font-thin"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="unitPrice" className="font-thin">Enter Unit Price</label>
            <input
              type="number"
              id="unitprice"
              placeholder="e.g 40"
              value={formType.unitprice}
              onChange={handleChange}
              required
              className="border-0 border-b-2 border-gray-300 focus:border-[#00ED64] focus:outline-none transition-colors duration-300 py-1 font-thin"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="qty" className="font-thin">Enter Quantity</label>
            <input
              type="number"
              id="qty"
              placeholder="e.g 100"
              value={formType.qty}
              onChange={handleChange}
              required
              className="border-0 border-b-2 border-gray-300 focus:border-[#00ED64] focus:outline-none transition-colors duration-300 py-1 font-thin"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="font-thin">Enter Category</label>
            <input
              type="text"
              id="category"
              placeholder="e.g Tiffins"
              value={formType.category}
              onChange={handleChange}
              required
              className="border-0 border-b-2 border-gray-300 focus:border-[#00ED64] focus:outline-none transition-colors duration-300 py-1 font-thin"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="itemImage" className="font-thin">Enter Item Image</label>
            <input
              type="file"
              id="itemImage"
              onChange={handleFile}
              required
              className="border-0 border-b-2 border-gray-300 focus:border-[#00ED64] focus:outline-none transition-colors duration-300 py-1 font-thin"
            />
          </div>
        </div>

        <button className="mt-6 py-2 bg-[#00ED64] border border-[#0C5822] rounded-xl hover:rounded-2xl transition-all duration-300 w-full text-white font-semibold"
        disabled={loading}
         onClick={handleSubmit}>
          {loading ? "LOADING...":"SUBMIT"}
        </button>
      </div>
    </div>
  );
};

export default AddModal