import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ShowBackground from '../components/ShowBackground';
import LoadingEffect from '../components/LoadingEffect';

export default function ForgotPassword() {
    const [loading,setLoading]=useState(false);
    const [email,setEmail]=useState("");
    const [success,setSuccess]=useState(false);
    const [name,setName]=useState("");
    const { currentUser } = useSelector(state => state.user);
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        const res=await fetch("/api/auth/forgotPassword", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ email }),
      
          })
          const data = await res.json();
        setLoading(false);

        if(res.status===400) toast.error(data.message);

        if(res.status===200) {
            setSuccess(true);
            setName(data.name);
        }
    }

    if(currentUser){
      return <Navigate to="/" replace={true}/>
    }

    return (
        <>
          <ShowBackground>
          

          <div className="items-center flex flex-col mx-2 text-[#28231d]">
            <div className="bg-slate-200 border-4 border-black bg-opacity-80 p-4 rounded-lg shadow-md relative z-10 overflow-hidden mx-3 w-80 md:w-92">
              <h2 className="text-2xl font-bold text-center mb-10">
                Forgot Password
              </h2>
              {success?(<div className='font-semibold text-center mt-10 mb-5'>
                {name}, check your email to reset the password
              </div>):(

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-4"
                    
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Type your email"
                    required
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-shadow"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  {loading ? (<LoadingEffect/>):(
                <button
                  disabled={loading}
                  type="submit"
                  className="relative w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-slate-600/70 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700 flex items-center justify-center"
                >
                     
                    Submit
                  
                </button>
              )}
                </div>
              </form>
              )}
              
            </div>
          </div>
          
          </ShowBackground>
        </>
      );
}
