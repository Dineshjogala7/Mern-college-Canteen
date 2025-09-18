import { useState, useEffect } from "react";
import axios from "axios"
import chocolateImg from "../assets/Screenshot 2025-09-08 225204.png";
import burgerImg from "../assets/Screenshot 2025-09-08 230055.png";
import icecreamImg from "../assets/Screenshot 2025-09-08 231112.png";
import Biryanis from "../assets/Biryani.jpeg";
import chocolates from "../assets/chocolates.jpeg"
import Snacks from "../assets/PavBhaji.jpeg";
import Beverages from "../assets/coke.jpeg";
import Icecreams from "../assets/icecream.jpeg";
import Tiffins from "../assets/dosa.jpeg";
import { toast } from "react-toastify";
import { useCart } from "@/Context/CartContext";

const images = [chocolateImg, burgerImg, icecreamImg];
const categories = [Tiffins, Biryanis , chocolates , Snacks , Beverages , Icecreams]
const categoryName = ["Tiffins", "Biryanis" , "chocolates" , "Snacks" , "Beverages" , "Icecreams"];

const items = ["all", "Tiffins", "Biryanis", "Chocolates", "Snacks", "Beverages", "IceCreams"];
const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(0);
  const [itemData , setItemData] = useState([]);
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");
  const {cartItems} = useCart();
  const cartItemIds = new Set(cartItems.items.map(item => item.itemid._id));
  const handleCartButton = async({itemid})=>{
    try {
      const result = await axios.post(`http://localhost:3000/user/cart/addcartitem/${userid}`,{
          itemid,qtyData:1
      },{
        headers:{
          Authorization : `Bearer ${token}`
        }
      },);
      console.log(result.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(()=>{
    const fetchItems = async()=>{
      try {
        
        const result = await axios.get(`http://localhost:3000/user/items/getitems/${items[active]}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setItemData(result.data?.itemsList);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchItems();
  },[token,active])
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f1ec] to-white w-full py-24 px-4">
      <div
        className="relative w-full max-w-[700px] md:h-[270px] h-[200px] transition-all rounded-2xl shadow-xl overflow-hidden flex items-center bg-white mx-auto"
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ height: "270px" }}
          />
        ))}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {images.map((_, idx) => (
            <div
                key={idx}
                className={`h-3 rounded-xl transition-all duration-500 cursor-pointer ${
                    idx === currentIndex
                    ? "w-8 bg-[#3eb47a] shadow-md"
                    : "w-3 bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(idx)}
                ></div>
            

          ))}
        </div>
      </div>
      <div className=" md:px-[8rem] px-2 py-4">
        <h1 className="font-thin text-4xl text-green-800 text-left my-4  font-serif">Categories</h1>
        {/* categories section now i define , later i will add the images*/}
        
        <div className="flex justify-start items-baseline gap-6 overflow-auto py-4">
          {categories.map((img, idx) => (
            <div
              key={idx}
              className="w-[200px] h-[200px] bg-white rounded-md shadow-lg flex flex-col items-center justify-center p-6 hover:bg-slate-50 cursor-pointer"
            >
              <div className="w-[120px] h-[120px] rounded-full bg-gray-200 flex items-center justify-center">
                <img
                  src={img}
                  alt={`image-${idx}`}
                  className="w-[80px] h-[80px] object-cover rounded-full"
                />
              </div>
              <h1 className="mt-4 text-center font-medium">{categoryName[idx]}</h1>
            </div>
          ))}
        </div>
      </div>

      {/* showing the Items*/}
      <section className="w-full min-h-screen  py-8 md:px-[8rem] px-2">
         <div className="mx-auto flex justify-center">
            <div className="flex gap-4 tracking-widest text-gray-500 overflow-x-auto scrollbar-hide md:gap-8">
              {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`transition-colors duration-600 md:text-lg whitespace-nowrap 
                ${
                  active === idx
                    ? "text-green-600 pb-1 border-b-2  border-green-600 "
                    : "border-transparent hover:text-green-400 "
                }`}
            >
              {item}
            </button>
          ))}
          </div>

         </div>
         <div className="grid md:grid-cols-4 grid-cols-2 gap-6  overflow-x-auto scrollbar-hide py-6 ">
                {itemData.map((item, idx) => (
                <div
  key={idx}
  className="w-[200px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center mt-4"
>
  {/* Image container with fixed size */}
  <div className="w-full h-32 flex items-center justify-center">
    <img
      src={item.itemUrl}
      alt={`itemno-${idx}`}
      className="object-contain w-full h-full rounded-lg"
    />
  </div>

  {/* Item Name */}
  <h1 className="mt-4 font-medium text-gray-700 text-center line-clamp-1">
    {item.itemname}
  </h1>

  {/* Price + Buttons */}
  <div className="mt-3 w-full flex justify-between items-center">
    <p className="text-green-600 font-semibold text-lg">
      ₹ {item.unitprice}
    </p>

   {/* Desktop Button */}
    <button
      className={`hidden md:block py-1 px-4 rounded-lg text-white font-medium transition-colors ${
        cartItemIds.has(item._id)
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
      onClick={() => handleCartButton({ itemid: item._id })}
      disabled={cartItemIds.has(item._id)}
    >
      {cartItemIds.has(item._id) ? "Added" : "Add"}
    </button>

    {/* Mobile Button */}
    <button
      className={`md:hidden block py-1 px-2 font-bold rounded-full text-white transition-colors ${
        cartItemIds.has(item._id)
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
      onClick={() => handleCartButton({ itemid: item._id })}
      disabled={cartItemIds.has(item._id)}
    >
      {cartItemIds.has(item._id) ? "✓" : "+"}
    </button>
  </div>
</div>

              ))}
        </div>

      </section>
      
    </div>
  );
};

export default Home;
