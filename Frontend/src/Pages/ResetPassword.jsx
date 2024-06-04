import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import ShowBackground from '../components/ShowBackground';
import LoadingEffect from '../components/LoadingEffect';

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [time, setTime] = useState(3);

    const { id, token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/auth/reset-password/${id}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            setLoading(false);

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message);
                return;
            }

            const data = await res.json();
            if(res.status===400) toast.error(data.message);
            if(res.status===200) toast.success("Password has been changed!")
            setSuccess(true);

        } catch (error) {
            setLoading(false);
            toast.error("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        if (success) {
            const interval = setInterval(() => {
                setTime((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(interval);
                        navigate('/account' ,{ replace: true });
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [success, navigate]);

    return (
        <>
        <ShowBackground>
            
                <div className="items-center flex flex-col mx-2 text-[#28231d]">
                    <div className="bg-slate-200 border-4 border-black bg-opacity-80 p-4 rounded-lg shadow-md relative z-10 overflow-hidden mx-3 w-80 md:w-92">
                        <h2 className="text-2xl font-bold text-center mb-10">
                            Reset Password
                        </h2>
                        {
                            success?(<div className='font-semibold text-center mt-10 mb-5'>
   
                                You will be redirected to the login page in {time} seconds.
                            </div>):(

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className='relative'>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium mb-4"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="New Password"
                                    required
                                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-shadow"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 mt-5"
                                >
                                  
                                </button>
                            </div>
                            <div>
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <LoadingEffect/>
                                    </div>
                                ) : (
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="relative w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-slate-600/70 hover:bg-slate-600 flex items-center justify-center"
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
