import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import ShowBackground from '../components/ShowBackground';
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import LoadingEffect from '../components/LoadingEffect';


export default function Account() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [formData, setFormData] = useState({});
  const [newFormData, setNewFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [isRegistered,setIsRegistered]=useState(false);
  const dispatch = useDispatch();

  const { currentUser } = useSelector(state => state.user);
  useEffect(()=>{
    if(currentUser){
      setIsLoggedIn(true);
      setIsRegistered(true);
    }

    else{
      setIsLoggedIn(false);
      setIsRegistered(false);
    }
  },[currentUser])


  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleNewChange = (e) => {
    setNewFormData({
      ...newFormData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setLoading(false);
    if (res.status === 200) {
      toast.success(data.message);
      dispatch(signInSuccess(data.userData));
    } else {
      toast.error(data.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFormData),
    });
    const data = await res.json();
    setLoading(false);
    if (res.status === 201) {
      toast.success(data.message, {});
      dispatch(signInSuccess(data.userData));
    } else {
      toast.error(data.message, {});
    }
  };

  const navigate=useNavigate();
  if (isLoggedIn || isRegistered) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <ShowBackground>
    <div className="relative flex items-center justify-center">
      
      <div className="bg-slate-200 border-4 border-black bg-opacity-80 p-4 rounded-lg shadow-md relative z-10 overflow-hidden mx-3 w-full md:w-auto">
        <div className={`transition-transform duration-1000 ${showLoginForm ? 'translate-y-28' : '-translate-y-96'} -mt-16`}>
        <div className='flex items-center justify-center'> 
          <h2 className="text-2xl font-bold text-center  ">Login</h2>
          <Link to={"/"} className=" translate-x-12 hover:cursor-pointer">
          <div data-tooltip-id="my-tooltip" data-tooltip-content="Go to the home page" >
            <FaHome />
          </div>
          <Tooltip id="my-tooltip" />
        </Link>
        </div>
          <form onSubmit={handleLoginSubmit} className="md:w-96">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-slate-700"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-700"
                required
              />
            </div>
            {loading?(<div className='flex items-center justify-center'>
              <LoadingEffect/>
            </div>):(<div className="flex items-center justify-between">
              <button
                type="submit"
                className="relative w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600/70 hover:bg-red-600/80 flex items-center justify-center"
              >
                Submit
              </button>
            </div>)}
            
          </form>
          <div className="font-bold text-black/80 hover:text-black/90 ml-4 cursor-pointer duration-0 text-sm mt-6" 
          onClick={(e)=>navigate("/forgot-password")}
            >
            Forgot Password?
          </div>
        </div>
        <div className={`transition-transform duration-1000 ${showLoginForm ? 'translate-y-96' : '-translate-y-10'} -mb-1 -mt-40`}>
        <div className='flex items-center justify-center'>
          <h2 className="text-2xl font-bold text-center ">Register</h2>
          <Link to={"/"} className=" translate-x-12 hover:cursor-pointer">
          <div data-tooltip-id="my-tooltip" data-tooltip-content="Go to the home page" >
            <FaHome />
          </div>
          <Tooltip id="my-tooltip" />
        </Link>
        </div>
          <form onSubmit={handleRegisterSubmit} className="md:w-96 ">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Username
              </label>
              <input
                id="userName"
                type="text"
                placeholder="Enter a username"
                value={newFormData.userName || ""}
                onChange={handleNewChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={newFormData.email || ""}
                onChange={handleNewChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-700"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter a strong password"
                value={newFormData.password || ""}
                onChange={handleNewChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-700"
                required
              />
            </div>
            {loading?(<div className='flex items-center justify-center'>
              <LoadingEffect/>
            </div>):
            (<div className="flex items-center justify-between">
              <button
                type="submit"
                className="relative w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600/70 hover:bg-red-600/80 flex items-center justify-center"
              >
                Submit
              </button>
            </div>)}
          </form>
        </div>
        <div className="text-center mt-4">
          <button
          disabled={loading}
            type="button"
            onClick={toggleForm}
            className="text-slate-800 hover:text-slate-950 focus:outline-none"
          >
            {showLoginForm ? 
              <span>Don't have an account? <span style={{ color: '#00356B', fontWeight:"bold" }}>Register here</span></span> 
              : 
              <span>Already have an account? <span style={{ color: '#00356B', fontWeight:"bold" }}>Login here</span></span>
            }
          </button>
        </div>
      </div>
    </div>
    </ShowBackground>
    </>
  );
}
