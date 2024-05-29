import React, { useEffect, useState } from 'react';

export default function Account() {
  const [bgImage, setBgImage] = useState("/img5.jpg");
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [formData,setFormData]=useState({});
  const [newFormData,setNewFormData]=useState({});

  useEffect(() => {
    const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg", "/img6.jpg", "/img7.jpg", "/img8.jpg", "/img9.jpg", "/img10.jpg"];
    const changeBackgroundImage = () => {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      setBgImage(randomImage);
    };

    const intervalId = setInterval(changeBackgroundImage, 7500);

    return () => clearInterval(intervalId);
  }, []);

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

  const handleLoginSubmit = (e) => {
    e.preventDefault();

  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

  };

  console.log(formData);
  console.log(newFormData)

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          transition: "background-image 2.1s ease-in-out",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      ></div>
      <div className="bg-slate-200 border-4 border-black bg-opacity-80 p-4 rounded-lg shadow-md relative z-10 overflow-hidden ">
        <div className={`transition-transform duration-1000 ${showLoginForm ? 'translate-y-28' : '-translate-y-96'} -mt-16`}>
          <h2 className="text-2xl font-bold text-center  ">Login</h2>
          <form onSubmit={handleLoginSubmit} className="w-96">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
            <button
              type="submit"
              className="relative w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600/70 hover:bg-red-600/80 flex items-center justify-center"
            >
                 
                Submit
              
            </button>
            </div>
          </form>
          <div className="font-bold text-black/80 hover:text-black/90 ml-4 cursor-pointer duration-0 text-sm mt-6" >
            Forgot Password?
          </div>
        </div>
        <div className={`transition-transform duration-1000 ${showLoginForm ? 'translate-y-96' : '-translate-y-10'} -mb-1 -mt-40`}>
          <h2 className="text-2xl font-bold text-center ">Register</h2>
          <form onSubmit={handleRegisterSubmit} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter a username"
                value={newFormData.username}
                onChange={handleNewChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                value={newFormData.email}
                onChange={handleNewChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="Enter a strong password"
                value={newFormData.password}
                onChange={handleNewChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
            <button
              type="submit"
              className="relative w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600/70 hover:bg-red-600/80 flex items-center justify-center"
            >
                Submit
            </button>
            </div>
          </form>
        </div>
        <div className="text-center mt-4">
        <button
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
  );
}