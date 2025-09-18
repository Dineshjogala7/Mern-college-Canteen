import { ShoppingCart ,Search , UserCircle2 , Heart} from "lucide-react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";

import Home  from "./Services/Home"
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"
import Profile from "./Profile"
import Cart from "./Cart"
import { ToastContainer } from "react-toastify"
import Queries from "./quries.json"
import { useCart } from "./Context/CartContext";
const App = ()=>{
  const token = localStorage.getItem("token");
  const navigate  = useNavigate();
  const {cartItems}= useCart();
  const notify = cartItems.items.length
  const ProtectedRoute = ({children})=>{
    if(!token) return <Navigate to="/login" />;
    return children;
  };

  return (
    <div>
      <ToastContainer position="bottom-right" 
        autoClose={3000} // auto close after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
      {/* Navigation */}
      <nav className="max-w-7xl w-full fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ">
        <div className="max-w-2xl w-full mx-auto px-6 py-4 flex justify-between items-center rounded-2xl border border-[#0C5822] shadow-md bg-white/70 backdrop-blur-md">
          {/* Logo */}
          <h1 
            onClick={() => token ? navigate("/") : navigate("/login")}
            className="text-[#00ED64] font-thin tracking-wide text-2xl cursor-pointer"
          >
            CANTEEN
          </h1>

          {/* Search */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for 'biryani'"
              className="border border-[#0C5822] py-1 pl-4 pr-10 rounded-2xl focus:outline-none focus:border-[#00ED64] w-64"
            />
            <Search className="absolute right-3 text-gray-400 w-5 h-5 cursor-pointer" />
          </div>

          {/* Icons */}
          <div className="flex gap-5 items-center">
              {/* Cart with badge */}
              <div className="relative">
                <ShoppingCart  
                  onClick={() => token ? navigate("/cart") : navigate("/login")}
                  className="font-thin text-gray-400 w-5 h-5 cursor-pointer" 
                />
                {notify > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
                    {notify}
                  </span>
                )}
              </div>

              {/* Profile */}
              <UserCircle2  
                onClick={() => token ? navigate("/profile") : navigate("/login")}
                className="font-thin text-gray-400 w-5 h-5 cursor-pointer" 
              />
            </div>

        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <section className="md:px-[8rem] px-2 py-6">
          <div>
            <h1 className="text-3xl font-thin text-center tracking-widest ">FAQ{' '}</h1>
            <Accordion type="single" collapsible className="w-full px-4 mt-4">
              {Queries.map((q, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} >
                  <AccordionTrigger className="text-lg md:text-xl font-thin hover:bg-gray-100 data-[state=open]:bg-gray-100 px-4">{q.question}</AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg text-gray-700 font-mono py-4 px-4">{q.answer}</AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>

          </div>
      </section>
      <footer className="w-full bg-green-800 text-white px-4 md:px-[8rem] py-8 font-serif rounded-t-3xl">
              <div className="text-center mb-4"> 
                <p className="tracking-widest text-2xl">made with Love from Dinesh </p>
              
              </div>
              <div className="flex justify-around gap-8">
                <div className="flex flex-col gap-2 md:text-lg">
                  <h1 className="text-lg md:text-2xl">About</h1>
                  <ul>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>relations</li>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>policies</li>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>Github</li>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>Security</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2 md:text-lg">
                  <h1 className="text-lg md:text-2xl">Support</h1>
                  <ul>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>relations</li>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>policies</li>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>Github</li>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>Security</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2 md:text-lg">
                  <h1 className="text-lg md:text-2xl">Careers</h1>
                  <ul>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>relations</li>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>policies</li>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>Github</li>
                    <li className="hover:underline transition-all duration-1000 cursor-pointer" onClick={()=>navigate("/")}>Security</li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-8 border-t-2 py-2">
                <p className="font-thin">All rights are reserved under 2025 policy </p>
              </div>
      </footer>
    </div>
  )
}

export default App;
