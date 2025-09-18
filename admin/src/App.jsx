import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./Services/Login";
import SignUp from "./Services/SignUp";
import Sales from "./Sales";
import Orders from "./Orders";
import Home from "./Services/Home";
import AddModal from "./Services/AddModal";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
function App() {
  const token  = localStorage.getItem("token");
  const [addModal,setAddModal] = useState(false);
  const navigate = useNavigate()
  const ProtectedRoute = ({children})=>{
    
    if(!token){
        return <Navigate to="/login" replace/>
    }
    else{
      return children
    }
  }
  const handleLogin = ()=>{
    navigate("/login")
  }
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <div >
      <ToastContainer position="bottom-right" 
        autoClose={3000} // auto close after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
      <nav className="max-w-7xl w-full fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ">
          <div className="max-w-2xl w-full mx-auto px-6 py-4 flex justify-between items-center 
                          rounded-2xl border border-[#0C5822] shadow-md bg-white/70 backdrop-blur-md">
           
            <h1 className="text-[#00ED64] font-thin tracking-wide text-xl cursor-pointer" onClick={(e)=>navigate("/")}>ADMIN</h1>

            {/* Nav Links */}
            <div className="flex items-center gap-6 text-gray-700">
              <Link to="/sales" className="hover:text-[#00ED64] font-thin transition active:text-[#00ED64]">SALES</Link>
              <Link to="/orders" className="hover:text-[#00ED64] font-thin transition active:text-[#00ED64]">ORDERS</Link>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-1 font-thin border border-[#0C5822] rounded-lg hover:bg-[#00ED64] hover:text-white transition"
              onClick={()=>setAddModal(!addModal)}>
                ADD +
              </button>
              <button className={`px-4 py-1 font-thin border border-[#0C5822] rounded-lg transition 
              ${token ? "bg-[#00ED64] text-white" : "hover:bg-[#0C5822] hover:text-white"}`}
              onClick={()=>(!token? handleLogin():handleLogout())}>
                {!token ? "LOGIN" : "LOGOUT"}
              </button>
            </div>
          </div>
        </nav>

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route  path="/sales" element={<ProtectedRoute><Sales/></ProtectedRoute>} />
        <Route  path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
      </Routes>
      {addModal && <AddModal setAddModal={setAddModal}/>}
    </div>
  );
}

export default App;
