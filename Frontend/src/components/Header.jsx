import { Link, useNavigate, useLocation } from "react-router-dom";
import SwitchTheme from "../Toggle Theme/SwitchTheme";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CrossIcon, HamburgerIcon } from "../Toggle Theme/Icons";
import "./css/Header.css";
import HeaderItem from "./HeaderItem";

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate("/profile");
  }

  const location=useLocation();
  const isAbout = location.pathname === '/about';

  return (
    <div className='flex justify-between items-center p-4 relative border-b border-black dark:border-[#d1d1e4] text-gray-600 dark:text-slate-50'>
      <div className='flex gap-4 ml-4 '>
        <button className="sm:hidden" hidden={isMenuOpen} onClick={toggleMenu}>
          <HamburgerIcon />
        </button>

        <div className='hidden sm:flex flex-row gap-4'>
          {currentUser ? (
            <div className="">
            <img src={`${currentUser.pic}`} className="w-8 h-8 rounded-full object-cover hover:cursor-pointer border border-black dark:border-[#d1d1e4]" onClick={handleClick}/>
            </div>
            
          ) : (
            <Link to="/account">
              <div className='font-semibold hover:text-slate-800 dark:hover:text-slate-50'>Sign In</div>
            </Link>
          )}
          <HeaderItem title='Trending' param='fetchTrending'/>
          <HeaderItem title='Top Rated' param='fetchTopRated'/>
          <Link to="/about" >
            <p className={`font-semibold  ${isAbout?"text-red-400 hover:text-red-400": "hover:text-slate-800 dark:hover:text-slate-50"} `}>About</p>
          </Link>
        </div>
      </div>

      <div className='flex items-center mr-4'>
        <Link to="/" className='mr-8'>
          <span className=' font-bold bg-gray-300 py-2 px-2 rounded-lg dark:bg-slate-600 border border-black dark:border-[#d1d1e4] hover:bg-slate-300 dark:hover:bg-gray-600 transition-all duration-100 text-gray-700 dark:text-slate-50'>
            CinemaPulse
          </span>
        </Link>
        <SwitchTheme />
      </div>

      {isMenuOpen && (
        <>
          <div className="menu-backdrop" onClick={toggleMenu}></div>
          <div className={`menu-container ${isMenuOpen ? 'open' : ''} dark:bg-[#1F201F]
          dark:text-[#d1d1e4]`}>
            <div className="menu-header">
              <span className='font-bold'>Menu</span>
              <button onClick={toggleMenu}>
                <CrossIcon />
              </button>
            </div>
            {currentUser ? (
              <div className="menu-item flex gap-2 items-center justify-center hover:cursor-pointer" onClick={handleClick}>
                <img src={`${currentUser.pic}`} className="w-8 h-8 rounded-full object-cover border border-black dark:border-[#d1d1e4]" />
                <span className="font-semibold">Profile</span>
              </div>
            ) : (
              <div className="menu-item">
                <Link to="/account" onClick={toggleMenu} className="hover:text-slate-800 dark:hover:text-black font-semibold">
                  Sign In
                </Link>
              </div>
            )}
            <div className="menu-item" onClick={toggleMenu}>
              
              <HeaderItem title='Trending' param='fetchTrending'/>
            </div>
            <div className="menu-item" onClick={toggleMenu}>
              <HeaderItem title='Top Rated' param='fetchTopRated'/>

            </div>
            <div className="menu-item ">
              <Link to="/about" onClick={toggleMenu} className={`font-semibold ${isAbout?"text-red-400 hover:text-red-400": "hover:text-slate-800 dark:hover:text-black"}`}>
                About
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}